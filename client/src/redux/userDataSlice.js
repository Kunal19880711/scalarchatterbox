import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  joinedRooms: [],
  identity: null,
  focusedRoom: null,
  isJoining: false,
};

const userDataSlice = createSlice({
  name: "joinedRooms",
  initialState,
  reducers: {
    resetUserData: (state) => {
      state.joinedRooms = [];
      state.identity = null;
      state.focusedRoom = null;
      state.isJoining = false;
    },

    setJoinedRooms: (state, action) => {
      state.joinedRooms = action.payload;
    },

    addRoomToJoinedRooms: (state, action) => {
      if (
        !state.joinedRooms.find(
          (roomInfo) => roomInfo.name === action.payload.name
        )
      ) {
        state.joinedRooms.push(action.payload);
      }
    },

    removeRoomFromJoinedRooms: (state, action) => {
      // 1. remove the room from list of joined rooms, if exists
      const index = state.joinedRooms.findIndex(
        (roomInfo) => roomInfo.name === action.payload
      );
      if (index !== -1) {
        state.joinedRooms.splice(index, 1);
      }

      // if removed room is focused, set focused room to null
      if (state.focusedRoom === action.payload) {
        state.focusedRoom = null;
        state.isJoining = false;
      }
    },

    addMemberToJoinedRoom: (state, action) => {
      const roomInfo = state.joinedRooms.find(
        (roomInfo) => roomInfo.name === action.payload.room
      );
      if (roomInfo && !roomInfo.members.includes(action.payload.member)) {
        roomInfo.members.push(action.payload.member);
      }
    },

    removeMemberFromJoinedRoom: (state, action) => {
      // 1. if action.payload.member is a identity, remove the room from joinedRoom list
      if (action.payload.member === state.identity) {
        const roomIndex = state.joinedRooms.findIndex(
          (roomInfo) => roomInfo.name === action.payload.room
        );
        if (roomIndex !== -1) {
          state.joinedRooms.splice(roomIndex, 1);
        }
        // 1.a. if that removed room is focused then set focused room to null
        if (state.focusedRoom === action.payload.room) {
          state.focusedRoom = null;
        }
      } else {
        // 2. else, remove person from the list of room members
        const roomInfo = state.joinedRooms.find(
          (roomInfo) => roomInfo.name === action.payload.room
        );
        if (roomInfo) {
          const memberIndex = roomInfo.members.indexOf(action.payload.member);
          if (memberIndex !== -1) {
            roomInfo.members.splice(memberIndex, 1);
          }
        }
      }
    },

    addMessageToJoinedRoom: (state, action) => {
      const roomInfo = state.joinedRooms.find(
        (info) => info.name === action.payload.room
      );
      if (roomInfo) {
        // 1. check if it is a duplicate chat, if yes neglecting it
        const { name, content, time } = action.payload;
        const lastElem = roomInfo.chats.at(-1);
        if (
          lastElem &&
          lastElem.name === name &&
          lastElem.content === content &&
          lastElem.time === time
        ) {
          return;
        }

        // 2. adding chat if it is a fresh chat
        roomInfo.chats.push({
          name,
          content,
          time,
        });
      }
    },

    setIdentity(state, action) {
      state.identity = action.payload;
    },

    setFocusedRoom(state, action) {
      state.focusedRoom = action.payload.focusedRoom;
      state.isJoining = action.payload.isJoining;
    },

    setIsJoining(state, action) {
      state.isJoining = action.payload;
    },
  },
});

export const {
  resetUserData,
  setJoinedRooms,
  addRoomToJoinedRooms,
  removeRoomFromJoinedRooms,
  addMemberToJoinedRoom,
  removeMemberFromJoinedRoom,
  addMessageToJoinedRoom,
  setIdentity,
  setFocusedRoom,
  setIsJoining,
} = userDataSlice.actions;
export default userDataSlice.reducer;
