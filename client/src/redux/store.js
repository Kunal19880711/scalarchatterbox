import { configureStore } from "@reduxjs/toolkit";
import allRoomsReducer from "./allRoomsSlice";
import userDataReducer from "./userDataSlice";
import socketMiddleware from "./socketMiddleware";

const store = configureStore({
  reducer: {
    allRooms: allRoomsReducer,
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
