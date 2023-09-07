import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 10,
};

const testReducer = createSlice({
  name: "testCount",
  initialState,
  reducers: {
    tangCount: (state, action) => {
      console.log("test click");
      state.count += action.payload;
    },
  },
});

export const { tangCount } = testReducer.actions;

export default testReducer.reducer;
