import axios from "axios";

class TMDB {
  apiKey = "766801b57d58c5b9a74ce41328c7d8f1";
  baseUrl = "https://api.themoviedb.org/3";
  async getGenres(type) {
    const route = `/genre/${type}/list`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then(({ genres }) => (genres ? genres : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getMovies(filter) {
    const route = `/discover/movie`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
          ...filter,
        },
      })
      .then((response) => response.data)
      .then(({ results }) => (results ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });
    return data;
  }
  async getTVShows(filter) {
    const route = `/discover/tv`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
          ...filter,
        },
      })
      .then((response) => response.data)
      .then(({ results }) => (results ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }
  async getMovie(id) {
    const route = `/movie/${id}`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then((data) => (data ? data : null))
      .catch((error) => {
        console.warn(error);
        return null;
      });

    return data;
  }
  async getTVShow(id) {
    const route = `/tv/${id}`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then((data) => (data ? data : null))
      .catch((error) => {
        console.warn(error);
        return null;
      });

    return data;
  }

  async getTrending(type, time_window = "week") {
    const route = `/trending/${type}/${time_window}`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then(({ results }) => (results ? results : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getCasts(type, item_id) {
    const route = `/${type}/${item_id}/credits`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then(({ cast }) => (cast ? cast : []))
      .catch((error) => {
        console.warn(error);
        return [];
      });

    return data;
  }

  async getCastSingle(item_id) {
    const route = `/person/${item_id}`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then((data) => (data ? data : false))
      .catch((error) => {
        console.warn(error);
        return false;
      });

    return data;
  }

  async searchItems(query, page) {
    const route = `/search/multi`;
    const url = `${this.baseUrl}${route}`;
    const data = await axios
      .get(url, {
        params: {
          query: query,
          page: page,
          api_key: this.apiKey,
        },
      })
      .then((response) => response.data)
      .then((data) => (data ? data : false))
      .catch((error) => {
        console.warn(error);
        return false;
      });
    return data;
  }
}
const TMDBApi=new TMDB()
export default TMDBApi;
