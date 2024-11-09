import socket from "../ws/socketService";

import {
  resetAllRooms,
  setAllRooms,
  addRoomToAllRooms,
  removeRoomFromAllRooms,
} from "./allRoomsSlice";
import {
  resetUserData,
  setIdentity,
  addRoomToJoinedRooms,
  removeRoomFromJoinedRooms,
  addMemberToJoinedRoom,
  removeMemberFromJoinedRoom,
  addMessageToJoinedRoom,
  setFocusedRoom,
} from "./userDataSlice";
import { IncomingMsg, OutgoingMsg, SocketEvents } from "../common/constants";

const socketMiddleware = (store) => (next) => (action) => {
  // Socket
  if (action.type === SocketEvents.Disconnect) {
    socket.on(SocketEvents.Disconnect, () => {
      store.dispatch(resetAllRooms());
      store.dispatch(resetUserData());
    });
  }

  // identity
  if (action.type === IncomingMsg.ConfirmIdentity) {
    socket.on(IncomingMsg.ConfirmIdentity, ({ name, rooms }) => {
      store.dispatch(setIdentity(name));
      store.dispatch(setAllRooms(rooms));
    });
  }

  // Rooms
  if (action.type === IncomingMsg.RoomAdded) {
    socket.on(IncomingMsg.RoomAdded, (room) => {
      store.dispatch(addRoomToAllRooms(room));
    });
  }

  if (action.type === IncomingMsg.RoomDeleted) {
    socket.on(IncomingMsg.RoomDeleted, (room) => {
      store.dispatch(removeRoomFromJoinedRooms(room));
      store.dispatch(removeRoomFromAllRooms(room));
    });
  }
  if (action.type === IncomingMsg.RoomJoined) {
    socket.on(IncomingMsg.RoomJoined, ({ room, members }) => {
      store.dispatch(
        addRoomToJoinedRooms({
          name: room,
          members,
          chats: [],
        })
      );
      store.dispatch(setFocusedRoom({ focusedRoom: room, isJoining: false }));
    });
  }

  // Members
  if (action.type === IncomingMsg.UserJoined) {
    socket.on(IncomingMsg.UserJoined, ({ room, name }) => {
      store.dispatch(
        addMemberToJoinedRoom({
          room,
          member: name,
        })
      );
    });
  }
  if (action.type === IncomingMsg.UserLeft) {
    socket.on(IncomingMsg.UserLeft, ({ room, name }) => {
      store.dispatch(
        removeMemberFromJoinedRoom({
          room,
          member: name,
        })
      );
    });
  }

  // Chats
  if (action.type === IncomingMsg.NewMessage) {
    socket.on(IncomingMsg.NewMessage, ({ room, name, message, time }) => {
      store.dispatch(
        addMessageToJoinedRoom({
          room,
          name,
          content: message,
          time,
        })
      );
    });
  }

  Object.values(OutgoingMsg).forEach((type) => {
    if (action.type === type) {
      socket.emit(type, action.payload);
    }
  });

  return next(action);
};

export default socketMiddleware;
