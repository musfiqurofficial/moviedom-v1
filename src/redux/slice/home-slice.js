import { createSlice } from "@reduxjs/toolkit";

const home_slice = createSlice({
  name: "home_slice",
  initialState: [
    {
      title: "Hollywood",
      data: [],
    },
  ],
  reducers: {
    addNewHomeSlide(state, { payload }) {
      return [...state, ...payload];
    },
  },
});

export const { addNewHomeSlide } = home_slice.actions;
const homeReducer = home_slice.reducer;
export default homeReducer;
