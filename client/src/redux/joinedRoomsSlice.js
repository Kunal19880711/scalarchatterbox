import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const joinedRoomsSlice = createSlice({
  name: "joinedRooms",
  initialState,
  reducers: {
    setJoinedRooms: (state, action) => {
      return action.payload;
    },

    addRoomToJoinedRooms: (state, action) => {
      if (!state.find((roomInfo) => roomInfo.name === action.payload.name)) {
        state.push(action.payload);
      }
    },

    removeRoomFromJoinedRooms: (state, action) => {
      const index = state.findIndex(
        (roomInfo) => roomInfo.name === action.payload
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    addMemberToJoinedRoom: (state, action) => {
      const roomInfo = state.find(
        (roomInfo) => roomInfo.name === action.payload.room
      );
      if (roomInfo && !roomInfo.members.includes(action.payload.member)) {
        roomInfo.members.push(action.payload.member);
      }
    },

    removeMemberFromJoinedRoom: (state, action) => {
      const roomInfo = state.find(
        (roomInfo) => roomInfo.name === action.payload.room
      );
      if (roomInfo) {
        const index = roomInfo.members.indexOf(action.payload.member);
        if (index !== -1) {
          roomInfo.members.splice(index, 1);
        }
      }
    },
    addMessageToJoinedRoom: (state, action) => {
      const roomInfo = state.find((info) => info.name === action.payload.room);
      if (roomInfo) {
        roomInfo.chats.push({
          name: action.payload.name,
          content: action.payload.content,
        });
      }
    },
  },
});

export const {
  setJoinedRooms,
  addRoomToJoinedRooms,
  removeRoomFromJoinedRooms,
  addMemberToJoinedRoom,
  removeMemberFromJoinedRoom,
  addMessageToJoinedRoom,
} = joinedRoomsSlice.actions;
export default joinedRoomsSlice.reducer;
