import { createSlice } from "@reduxjs/toolkit";

const duumyInitalValue = [
  "alpha",
  "bravo",
  "charlie",
  "omega",
  "theeta",
  "charlie",
];

const initialState = duumyInitalValue;

const allRoomsSlice = createSlice({
  name: "allRooms",
  initialState,
  reducers: {
    setAllRooms: (state, action) => action.payload,

    addRoomToAllRooms: (state, action) =>
      state.includes(action.payload) ? state : [action.payload, ...state],

    removeRoomFromAllRooms: (state, { payload: roomId }) =>
      state.filter((room) => room.id !== roomId),
  },
});

export const { setAllRooms, addRoomToAllRooms, removeRoomFromAllRooms } =
  allRoomsSlice.actions;
export default allRoomsSlice.reducer;
