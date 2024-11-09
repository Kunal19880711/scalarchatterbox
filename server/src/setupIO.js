import { Server as Io } from "socket.io";
import {
  SocketEvents,
  OutgoingMsg,
  OutgoingFormResponseMsg,
  IncomingMsg,
} from "./constants";

const socketMap = new Map();
const roomMap = new Map();

function getMemberNamesOfRoom(room) {
  const memberSet = roomMap.get(room);
  const members = [...memberSet]
    .map((socketId) => socketMap.get(socketId)?.name)
    .filter((name) => !!name);
  return members;
}

export default function setupIO(server) {
  const io = new Io(server);

  io.on(SocketEvents.Connect, (socket) => {
    // 1. initialize socket's data in socketMap
    socketMap.set(socket.id, {
      name: null,
      roomSet: new Set(),
    });

    socket.on(IncomingMsg.SetIdentity, (name) => {
      // 1. check if name already been taken
      for (let [_, socketInfo] of socketMap.entries()) {
        if (name === socketInfo.name) {
          socket.emit(OutgoingFormResponseMsg.UserCreation, {
            success: false,
            error: `Name: [${name}] already been taken.`,
          });
          return;
        }
      }
      socket.emit(OutgoingFormResponseMsg.UserCreation, { success: true });

      // 2. set socket's name in socketMap
      socketMap.get(socket.id).name = name;

      // 3. notify socket with confirmIdentity event
      socket.emit(OutgoingMsg.ConfirmIdentity, {
        name,
        rooms: [...roomMap.keys()],
      });
    });

    socket.on(IncomingMsg.CreateRoom, (room) => {
      // 1. check if room already exists
      if (roomMap.has(room)) {
        socket.emit(OutgoingFormResponseMsg.RoomCreation, {
          success: false,
          error: `Room: [${room}] already exists.`,
        });
        return;
      }
      socket.emit(OutgoingFormResponseMsg.RoomCreation, { success: true });

      // 2. add room to roomMap
      roomMap.set(room, new Set([socket.id]));

      // 3. add room to socket's roomSet
      socketMap.get(socket.id).roomSet.add(room);

      // 4. notify all sockets (including the one that created the room)
      io.emit(OutgoingMsg.RoomAdded, room);

      // 5. join the socket to the room
      socket.join(room);

      // 6. notify the socket that joined the room
      const members = getMemberNamesOfRoom(room);
      socket.emit(OutgoingMsg.RoomJoined, { room, members });
    });

    socket.on(IncomingMsg.DeleteRoom, (room) => {
      // 1. get the set of sockets in the room
      const members = roomMap.get(room);

      // 2. remove the room from each socket's roomSet
      for (let memberSocketId of members) {
        socketMap.get(memberSocketId).roomSet.delete(room);
      }

      // 3. every member should leave the room
      for (let memberSocketId of members) {
        io.sockets.sockets.get(memberSocketId)?.leave(room);
      }

      // 4. notify all sockets that the room was deleted
      io.emit(OutgoingMsg.RoomDeleted, room);
    });

    socket.on(IncomingMsg.JoinRoom, (room) => {
      // 1. add room to socket's roomSet
      socketMap.get(socket.id).roomSet.add(room);

      // 2. add socket to room's set of sockets
      roomMap.get(room).add(socket.id);

      // 3. get the set of names in the room
      const members = getMemberNamesOfRoom(room);

      // 4. join the socket to the room
      socket.join(room);

      // 5. notify the socket that joined the room
      socket.emit(OutgoingMsg.RoomJoined, { room, members });

      // 6. notify all other sockets in the room that another user joined
      const { name } = socketMap.get(socket.id);
      io.to(room).emit(OutgoingMsg.UserJoined, { room, name });
    });

    socket.on(IncomingMsg.LeaveRoom, (room) => {
      const { name } = socketMap.get(socket.id);

      // Step 1: Remove the room from the user's roomSet
      socketMap.get(socket.id).roomSet.delete(room);

      // Step 2: Remove the user from the room's set of sockets
      roomMap.get(room).delete(socket.id);

      // Step 3: Notify all users in the room that the user has left
      io.to(room).emit(OutgoingMsg.UserLeft, { room, name });

      // Step 4: Make the user leave the room
      socket.leave(room);
    });

    socket.on(IncomingMsg.SendMessage, ({ room, message }) => {
      // Step 1: Get the user's name from the socketMap
      const { name } = socketMap.get(socket.id);

      // Step 2: Emit a newMessage event to all sockets in the room
      const time = Date.now();
      io.to(room).emit(OutgoingMsg.NewMessage, { room, name, message, time });
    });

    socket.on(SocketEvents.Disconnect, () => {
      const { name, roomSet } = socketMap.get(socket.id);

      // Step 1: Remove the user from all rooms in roomSet
      for (let room of roomSet) {
        roomMap.get(room).delete(socket.id);
      }

      // Step 2: Notify all users in each room that the user has left
      for (let room of roomSet) {
        io.to(room).emit(OutgoingMsg.UserLeft, { room, name });
      }

      // Step 3: Remove the user from socketMap
      socketMap.delete(socket.id);
    });
  });
}
