import { Server as Io } from "socket.io";

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

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.emit("reset");

    socketMap.set(socket.id, {
      name: null,
      roomSet: new Set(),
    });

    socket.on("setIdentity", (name) => {
      socketMap.get(socket.id).name = name;
      socket.emit("confirmIdentity", {
        name,
        rooms: [...roomMap.keys()],
      });
    });

    socket.on("createRoom", (room) => {
      roomMap.set(room, new Set([socket.id]));
      socketMap.get(socket.id).roomSet.add(room);
      io.emit("roomAdded", room);

      socket.join(room);
      const members = getMemberNamesOfRoom(room);
      socket.emit("roomJoined", { room, members });
    });

    socket.on("deleteRoom", (room) => {
      const members = roomMap.get(room);
      for (let member of members) {
        socketMap.get(member).roomSet.delete(room);
      }
      io.emit("roomDeleted", room);
    });

    socket.on("joinRoom", (room) => {
      const { name } = socketMap.get(socket.id);
      socketMap.get(socket.id).roomSet.add(room);
      roomMap.get(room).add(socket.id);

      const members = getMemberNamesOfRoom(room);

      socket.join(room);
      socket.emit("roomJoined", { room, members });
      io.to(room).emit("userJoined", { room, name });
      console.log("send used joined", { room, name });
    });

    socket.on("leaveRoom", (room) => {
      const { name } = socketMap.get(socket.id);
      socketMap.get(socket.id).roomSet.delete(room);
      roomMap.get(room).delete(socket.id);

      socket.leave(room);

      io.to(room).emit("userLeft", { room, name });
    });

    socket.on("sendMessage", ({ room, message }) => {
      const { name } = socketMap.get(socket.id);
      io.to(room).emit("newMessage", { room, name, message });
    });

    socket.on("disconnect", () => {
      const { name, roomSet } = socketMap.get(socket.id);
      for (let room of roomSet) {
        roomMap.get(room).delete(socket.id);
        io.to(room).emit("userLeft", { room, name });
      }
      socketMap.delete(socket.id);

      console.log("User disconnected:", socket.id);
    });
  });
}
