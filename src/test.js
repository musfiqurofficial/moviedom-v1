import axios from "axios";
import MovieDom, { MainServerURL } from "./Api/MovieDom";

export function logError(error) {
  if (process.env.NODE_ENV === "development") {
    console.info("NO ERROR LOG API WILL BE CALLED DURING DEVELOPMENT TIME.");
    return;
  }
  const id =
    "AKfycbyzr_eseZjFT7t0dqiKaXdKyPnZbBTgWLntbawghOlYhKZSRUZKpO54hz3e-pAjpw3Pcg";
  axios(
    `https://script.google.com/macros/s/${id}/exec?text=${error?.message}&device=${window?.navigator?.userAgent}&serverIP=${MainServerURL}&serverName=${MovieDom?.appName}&errorName=${error?.name}`
  )
    .then(({ data }) => console.log("Error LOGGED"))
    .catch((error) => {
      console.log(error.message);
    });
}
export function logDevice() {
  if (process.env.NODE_ENV === "development") {
    console.info("NO DEVICE WILL BE LOGGED DURING DEVELOPMENT TIME.");
    return;
  }
  const id =
    "AKfycbzkrLwsQXiAF4L0vCbBKpwkVWkwea8T0FQ_upygQlVwnKNr3rQAna7g1xSZ2NgPiOF5gw";
  axios(`https://script.google.com/macros/s/${id}/exec`, {
    params: {
      device: window?.navigator?.userAgent,
      serverIP: MainServerURL,
      serverName: MovieDom?.appName,
    },
  })
    .then(({ data }) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
}
