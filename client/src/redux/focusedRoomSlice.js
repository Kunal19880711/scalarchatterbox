import { createSlice } from "@reduxjs/toolkit";

const dummyInitalValue = {
  focusedRoom: "alpha",
  isJoining: false,
};

const initialState = dummyInitalValue;

const focusedRoomSlice = createSlice({
  name: "focusedRoom",
  initialState,
  reducers: {
    setFocusedRoom: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { setFocusedRoom } = focusedRoomSlice.actions;
export default focusedRoomSlice.reducer;
