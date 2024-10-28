import socket from "../ws/socketService";

import { setIdentity } from "./identitySlice";
import {
  setAllRooms,
  addRoomToAllRooms,
  removeRoomFromAllRooms,
} from "./allRoomsSlice";
import {
  setJoinedRooms,
  addRoomToJoinedRooms,
  removeRoomFromJoinedRooms,
  addMemberToJoinedRoom,
  removeMemberFromJoinedRoom,
  addMessageToJoinedRoom,
} from "./joinedRoomsSlice";
import { setFocusedRoom } from "./focusedRoomSlice";
import { IncomingMsg, OutgoingMsg } from "../common/contants";

const listeners = new Set();

const socketMiddleware = (store) => (next) => (action) => {
  // reset
  if (action.type === IncomingMsg.Reset && !listeners.has(IncomingMsg.Reset)) {
    socket.on(IncomingMsg.Reset, () => {
      store.dispatch(setIdentity(null));
      store.dispatch(setAllRooms([]));
      store.dispatch(setJoinedRooms([]));
      store.dispatch(
        setFocusedRoom({
          focusedRoom: null,
          isJoining: false,
        })
      );
    });
    listeners.add(IncomingMsg.Reset);
  }

  // identity
  if (
    action.type === IncomingMsg.ConfirmIdentity &&
    !listeners.has(IncomingMsg.ConfirmIdentity)
  ) {
    socket.on(IncomingMsg.ConfirmIdentity, ({ name, rooms }) => {
      store.dispatch(setIdentity(name));
      store.dispatch(setAllRooms(rooms));
    });
    listeners.add(IncomingMsg.ConfirmIdentity);
  }

  // Rooms
  if (
    action.type === IncomingMsg.RoomAdded &&
    !listeners.has(IncomingMsg.RoomAdded)
  ) {
    socket.on(IncomingMsg.RoomAdded, (room) => {
      store.dispatch(addRoomToAllRooms(room));
    });
    listeners.add(IncomingMsg.RoomAdded);
  }

  if (
    action.type === IncomingMsg.RoomDeleted &&
    !listeners.has(IncomingMsg.RoomDeleted)
  ) {
    socket.on(IncomingMsg.RoomDeleted, (room) => {
      store.dispatch(removeRoomFromJoinedRooms(room));
      store.dispatch(removeRoomFromAllRooms(room));
    });
    listeners.add(IncomingMsg.RoomDeleted);
  }
  if (
    action.type === IncomingMsg.RoomJoined &&
    !listeners.has(IncomingMsg.RoomJoined)
  ) {
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
    listeners.add(IncomingMsg.RoomJoined);
  }

  // Members
  if (
    action.type === IncomingMsg.UserJoined &&
    !listeners.has(IncomingMsg.UserJoined)
  ) {
    socket.on(IncomingMsg.UserJoined, ({ room, name }) => {
      console.log("someone joined", { room, name });
      store.dispatch(
        addMemberToJoinedRoom({
          room,
          member: name,
        })
      );
    });
    listeners.add(IncomingMsg.UserJoined);
  }
  if (
    action.type === IncomingMsg.UserLeft &&
    !listeners.has(IncomingMsg.UserLeft)
  ) {
    socket.on(IncomingMsg.UserLeft, ({ room, name }) => {
      store.dispatch(
        removeMemberFromJoinedRoom({
          room,
          member: name,
        })
      );
    });
    listeners.add(IncomingMsg.UserLeft);
  }

  // Chats
  if (
    action.type === IncomingMsg.NewMessage &&
    !listeners.has(IncomingMsg.NewMessage)
  ) {
    socket.on(IncomingMsg.NewMessage, ({ room, name, message }) => {
      console.log("recieved message", { room, name, message });
      store.dispatch(addMessageToJoinedRoom({ room, name, content: message }));
    });
    listeners.add(IncomingMsg.NewMessage);
  }

  Object.values(OutgoingMsg).forEach((type) => {
    if (action.type === type) {
      socket.emit(type, action.payload);
    }
  });

  return next(action);
};

export default socketMiddleware;
