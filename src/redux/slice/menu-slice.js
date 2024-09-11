import { createSlice } from "@reduxjs/toolkit";

const menu_slice = createSlice({
  name: "menu_slice",
  initialState: {
    movies: {
      category: [],
      genre: [],
    },
    tv_series: {
      category: [],
      genre: [],
    },
    const_menu: [],
  },
  reducers: {
    update_movies_menu(state, { payload }) {
      return { ...state, movies: { ...state.movies, ...payload } };
    },
    update_tv_series_menu(state, { payload }) {
      return { ...state, tv_series: { ...state.tv_series, ...payload } };
    },
    update_const_menu(state, { payload }) {
      return { ...state, const_menu: payload };
    },
  },
});

export const { update_movies_menu, update_tv_series_menu,update_const_menu } = menu_slice.actions;
const menu_reducer = menu_slice.reducer;
export default menu_reducer;
