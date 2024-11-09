import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allRoomsSlice = createSlice({
  name: "allRooms",
  initialState,
  reducers: {
    resetAllRooms: (state) => [],

    setAllRooms: (state, action) => action.payload,

    addRoomToAllRooms: (state, action) => {
      if (!state.includes(action.payload)) {
        state.unshift(action.payload);
      }
    },

    removeRoomFromAllRooms: (state, action) => {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const {
  resetAllRooms,
  setAllRooms,
  addRoomToAllRooms,
  removeRoomFromAllRooms,
} = allRoomsSlice.actions;
export default allRoomsSlice.reducer;
