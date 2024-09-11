import React, { useLayoutEffect } from "react";
import { goToTop } from "../../../lib/tools";
import Layout from "../../components/Layout/Layout";
import Slider from "../../components/Slider/Slider";
import Banner from "./Banner";
import { useTitle } from "react-haiku";
import MovieDom, { slug } from "../../../Api/MovieDom";
import { useSelector } from "react-redux";

const Home = () => {
  const {site}=useSelector(store=>store.site);
  useTitle(`${site?.name || MovieDom.appName} - ${slug}`);
  const {
    movies: { category: movie_categories },
  } = useSelector((store) => store.menu);
  useLayoutEffect(() => {
    goToTop();
  }, []);
  return (
    <Layout>
      <Banner />
      <Slider
        // devider
        righted
        route="/movies"
        type="movie"
        tabs={[
          { title: "Recent", filter: { genre: "" } },
          { title: "Adventure", filter: { genre: "Adventure" } },
          { title: "Animation", filter: { genre: "Animation" } },
        ]}
      />
      <Slider
        route="/tv-series"
        title={"Tv & web series"}
        filter={{
          category: "",
        }}
        type="tv-series"
      />
      {movie_categories?.map((item, index) => (
        <Slider
          dark={index % 2 === 0}
          route="/movies"
          title={item.name + " Movies"}
          filter={{
            category: item.name,
          }}
          type="movie"
        />
      ))}
    </Layout>
  );
};

export default Home;
