import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setIdentity: (state, action) => action.payload,
  },
});

export const { setIdentity } = identitySlice.actions;
export default identitySlice.reducer;
