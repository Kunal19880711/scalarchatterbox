import { configureStore } from "@reduxjs/toolkit";
import allRoomsReducer from "./allRoomsSlice";
import joinedRoomReducer from "./joinedRoomsSlice";
import focusedRoomReducer from "./focusedRoomSlice";
import identityReducer from "./identitySlice";

const store = configureStore({
  reducer: {
    allRooms: allRoomsReducer,
    joinedRooms: joinedRoomReducer,
    focusedRoom: focusedRoomReducer,
    identity: identityReducer,
  },
});

export default store;
