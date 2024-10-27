import { createSlice } from "@reduxjs/toolkit";

const dummyInitialValue =  "John Doe";

const initialState = dummyInitialValue;

const identitySlice = createSlice({
  name: "identity",
  initialState,
  reducers: {
    setIdentity: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setIdentity } = identitySlice.actions;
export default identitySlice.reducer;
