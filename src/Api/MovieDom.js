import axios from "axios";
import { _HIT_ORIGIN } from "../constant";

export function isArrayTrue(array) {
  return Array.isArray(array) && array.length > 0;
}
export const slug =
  "Watch live online free 10000+ HD Movies and Tv series. download also Games , Softwares and many more.";

const DEV_URLS = ["http://localhost:3000/", "http://localhost:3001/"];

export const LOGO_PATH = ``;
export const LOGO_WIDTH = { name: "logo width", value: 200 };
export const SLIDER_BANNER = {
  name: "slider banner",
  value: false,
  slide_per_view: 6,
};
export const SINGLE_BANNER = {
  name: "single slider",
  value: true,
  slide_number: 10,
};
export const SIMPLE_BANNER = {
  name: "SIMPLE BANNER",
  value: false,
};
export const SINGLE_PAGE_PLAYER = {
  name: "Single Page Player",
  value: true,
};

// Change Ip here------------------------------------
const OTHER_ORIGINS = [
  window.location.origin+"/",
  // "http://amaderftp.net/",
  // "http://mathanosto.top/",
  //SPEED PLUS FTP
  // `http://103.158.124.38/`,
  // `http://gumnai.com/`,
  // `https://gumnai.com/`,
  // `http://www.gumnai.com/`,
  // `https://www.gumnai.com/`,

  //FM NET
  // "http://fmftp.net/",
  // "103.179.128.246"

  //Cinehub 24 (LINK 3)
  // "http://cinehub24.com/",
  // "http://www.cinehub24.com/",

  // Click Movies
  // 'http://clickmovies.pk/',
  // 'http://10.20.30.53/',
  // 'http://103.125.177.227/',
  // Achiver Net (ABI)
  // "http://abistation.net/",
  // "http://19.19.19.3/",
  // "http://103.134.58.242/",
  //T FLIX
  // "http://10.20.1.2/", "http://tflixbd.com/", "http://www.tflixbd.com/", "http://103.204.209.177:8008/"
  // EASYFLIX-->
  // "http://103.112.59.2/",

  // SMART FLIX
  // "http://tflixbd.com/",
  // "http://smartflix.digital/",
  // "https://smartflix.digital/",
  // "https://www.smartflix.digital/",

  // BRISK
  "http://172.102.0.3/",
  "http://smiledotnet.xyz",
  "https://smiledotnet.xyz",
  "https://www.smiledotnet.xyz",
  "http://smiledotnet.xyz",
  "https://smiledotnet.xyz",
  "https://www.smiledotnet.xyz",
];

export const MainServerURL = "http://103.112.150.230/"; //http://203.76.96.50/
export const accessible_urls = [...DEV_URLS, MainServerURL, ...OTHER_ORIGINS];
class MovieDom {
  // app name --------------------------------------
  appName = "Smile Dot Net";
  baseUrl = `${MainServerURL}/api/v1`;
  async getGenres(type) {
    const route = `/${type}genre.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then((genre) => (isArrayTrue(genre) ? genre : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getCategories(type) {
    const route = `/${type}category.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then((categories) => (isArrayTrue(categories) ? categories : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async viewCount() {
    const route = `/pageviews.php`;
    const url = `${this.baseUrl}${route}`;
    const res = await axios(url)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return "";
      });
    return res;
  }

  async getMovies(params) {
    const route = `/movies.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getTVShows(params) {
    const route = `/tvshows.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getItemsByCast(type, name) {
    const route = `/${type}bycast.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: { name: name },
      })
      .then((response) => {
        return response.data;
      })
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getTVEpisodes(params) {
    const route = `/tvepisodes.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getSecret() {
    const route = `/apihandshake.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url)
      .then((response) => response.data)
      .then(({ secret }) => (secret ? secret : ""))
      .catch((error) => {
        console.warn(error);
        return "";
      });
    return data;
  }
  async getSearchItems(params) {
    const route = `/search.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params,
      })
      .then((response) => response.data)
      .then((results) => (isArrayTrue(results) ? results : []))
      .catch((error) => {
        console.warn(error);
        return false;
      });
    return data;
  }

  async getMenu(parent) {
    const route = `/menu.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          parent: parent,
        },
      })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getSingleItem(params) {
    const route = `/byid.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getSortedItems(params, type = "") {
    if (!type) {
      console.warn("Type is mission is /getSortedItems()/");
      return;
    } else {
      let route = type.toLowerCase().includes("movie")
        ? `/sorting.php`
        : "/tvsorting.php";
      const url = `${this.baseUrl}${route}`;
      const data = await axios
        .get(url, { params })
        .then((response) => {
          return response.data;
        })
        .then((results) => {
          return isArrayTrue(results) ? results : [];
        })
        .catch((error) => {
          console.warn(error);
          return [];
        });
      return data;
    }
  }

  async sendRequestData(params) {
    const route = "/insertreq.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        return isArrayTrue(res) ? res : [];
      })
      .catch((err) => {
        console.warn(err);
        return [];
      });
    return data;
  }

  async getThisUserRequest(params) {
    const route = "/fetchreq.php";
    const url = `${MainServerURL}/api/v1${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => {
        return response.data;
      })
      .then((results) => {
        return isArrayTrue(results) ? results : [];
      })
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getYears(type, params = { category: "all" }) {
    const route = `/${type}yearbycat.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((categories) => (isArrayTrue(categories) ? categories : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getGames(params) {
    const route = `/games.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getSoftware(params) {
    const route = `/software.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((menuitems) => (isArrayTrue(menuitems) ? menuitems : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }

  async getLiveTvs(params) {
    const route = `/livetv.php`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, { params })
      .then((response) => response.data)
      .then((livetvs) => (isArrayTrue(livetvs) ? livetvs : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
}

export function getPublicJSON(json = "") {
  return axios.get(`${_HIT_ORIGIN}/${json}?timestamp=${new Date().getTime()}`);
}

export default new MovieDom();
