import { createSlice } from "@reduxjs/toolkit";
import MovieDom, { LOGO_PATH, LOGO_WIDTH, MainServerURL } from "../../Api/MovieDom";
import { _STATUS } from "../../constant";

// 🏛️ SITE CLASS
export class Site {
  constructor({ name, logo, logo_width, origins = [], root_origin }) {
    this.name = name;
    this.logo = logo;
    this.origins = origins;
    this.root_origin = root_origin;
    this.logo_width = logo_width;
  }
}

// 📁 DEFAULT SITE
const DEFAULT_SITE = new Site({
  name: MovieDom.appName,
  logo: LOGO_PATH,
  logo_width: LOGO_WIDTH,
  origins: [MainServerURL],
  root_origin: MainServerURL,
});

const site_slice = createSlice({
  name: "site_slice",
  initialState: {
    site_loading: _STATUS.loading,
    expired: false,
    blocked: true,
    site: DEFAULT_SITE,
  },
  reducers: {
    updateSite(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    
  }
});

export const { updateSite } = site_slice.actions;
const siteReducer = site_slice.reducer;
export default siteReducer;
