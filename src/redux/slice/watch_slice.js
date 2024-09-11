import { createSlice } from "@reduxjs/toolkit";

const watch_slice = createSlice({
  name: "watch_slice",
  initialState: {},
  reducers: {
    update_player(state, { payload }) {
      return payload;
    },
  },
});

export const { update_player } = watch_slice.actions;
const watch_reducer = watch_slice.reducer;
export default watch_reducer;
