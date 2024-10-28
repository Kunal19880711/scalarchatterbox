import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  focusedRoom: null,
  isJoining: false,
};

const focusedRoomSlice = createSlice({
  name: "focusedRoom",
  initialState,
  reducers: {
    setFocusedRoom: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setFocusedRoom } = focusedRoomSlice.actions;
export default focusedRoomSlice.reducer;
