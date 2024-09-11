import { saveAs } from "file-saver";
import { MainServerURL } from "../Api/MovieDom";

export function dynamicSort(property) {
  return function (a, b) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
}

export function getS0E0(num) {
  if (Number(num) < 10) {
    return `0${Number(num)}`;
  } else {
    return `${num}`;
  }
}

export function getEpisodImg(id, season, episode, imgPath) {
  if (imgPath)
    return `${MainServerURL}/Admin/main/TVseries/${id}/${getS0E0(
      season
    )}/${getS0E0(episode)}/${imgPath}`;
  else return `/no-poster.jpg`;
}

// GET SERVER IMAGE PATH
export const getServerImgPath = (id, url, imgFor, type, higher) => {
  if (!url) {
    if (type.includes("poster")) {
      return `${MainServerURL}/no-poster.jpg`;
    } else {
      return `${MainServerURL}/no-backdrop.jpg`;
    }
  }
  if (!imgFor) {
  } else {
    if (imgFor.includes("movie")) {
      return `${MainServerURL}/Admin/main/images/${id}/${
        type.includes("poster") ? "poster" : "screen"
      }/${type.includes("poster") ? "" : ""}/${url}`;
    } else if (imgFor.includes("tv")) {
      return `${MainServerURL}/Admin/main/TVseries/${id}/${
        type.includes("poster") ? "poster" : "screen"
      }/${url}`;
    }
  }
};

export function getTMDBimgPath(size = "w185", img) {
  return img ? `https://image.tmdb.org/t/p/${size}/${img}` : `/no-poster.jpg`;
}

export function checkIsExpired(date) {
  return date < new Date();
}

export function goToTop() {
  try {
    window?.scrollTo(0,0);
  } catch (error) {
    try {
      alert(error.message);
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const saveFile = (url, name) => {
  const fileExt = url.slice(url.length - 4, url.length);
  const fileName = name + fileExt;
  const link = url?.trim()?.split(" ")?.join("%20");
  saveAs(link, fileName);
};
