import { createSlice } from "@reduxjs/toolkit";

export const CARD_TYPES={
    POSTER:'POSTER_CARD',
    BACKDROP:"BACKDROP_CARD"
}


const card_slice = createSlice({
  name: "CARD_SLICE",
  initialState: {
    card_type: CARD_TYPES.POSTER,
  },
  reducers: {
    toggleCardType(state,{payload}) {
      return {
          ...state,
          card_type: payload,
      };
    },
  },
});

export const { toggleCardType } = card_slice.actions;
const card_slice_reducer = card_slice.reducer;

export default card_slice_reducer;
