import { configureStore } from "@reduxjs/toolkit";
import card_slice_reducer from "./slice/card-slice";
import filter_reducer from "./slice/filter_slice";
import homeReducer from "./slice/home-slice";
import menu_reducer from "./slice/menu-slice";
import siteReducer from "./slice/site-slice";
import watch_reducer from "./slice/watch_slice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    filter: filter_reducer,
    watch: watch_reducer,
    menu: menu_reducer,
    site: siteReducer,
    card:card_slice_reducer
  },
});
