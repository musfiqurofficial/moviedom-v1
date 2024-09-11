import { createSlice } from "@reduxjs/toolkit";
const filter_slice = createSlice({
  name: "filter_slice",
  initialState: {
    movies_filter: {
      category: "",
      genre: "",
      year: "",
      minrating: 0,
      maxrating: 10,
      search:''
    },
    tv_series_filter: {
      category: "",
      genre: "",
      year: "",
      minrating: 0,
      maxrating: 3,
      search:''
    },
    search: {
      search: "",
    },
  },
  reducers: {
    update_movies_filter(state, { payload }) {
      return {
        ...state,
        movies_filter: { ...state.movies_filter, ...payload },
      };
    },
    update_tv_series_filter(state, { payload }) {
      return {
        ...state,
        tv_series_filter: { ...state.tv_series_filter, ...payload },
      };
    },
    update_search(state, { payload }) {
      return {
        ...state,
        search: { ...state.search, ...payload },
      };
    },
  },
});

export const { update_movies_filter, update_tv_series_filter, update_search } =
  filter_slice.actions;
const filter_reducer = filter_slice.reducer;
export default filter_reducer;
