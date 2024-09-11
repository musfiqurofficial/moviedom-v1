import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useTitle } from "react-haiku";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MovieDom, { SINGLE_PAGE_PLAYER } from "../../../Api/MovieDom";
import TMDBApi from "../../../Api/TMDB";
import { getServerImgPath, goToTop } from "../../../lib/tools";
import { logError } from "../../../test";
import Layout from "../../components/Layout/Layout";
import RelatedItems from "../../components/Slider/RelatedItems";
import NotFound from "../Others/NotFound";
import SiteLoading from "../Others/SiteLoading";
import Cast from "./Cast";
import Details from "./Details";
import Player, { Episodes } from "./Player";

const Watch = ({ movie }) => {
  const { site } = useSelector((store) => store.site);
  const { id } = useParams();
  const [single_item, setSingleItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [related_items, setRelatedItems] = useState([]);
  const [cast, setCast] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const dt = await MovieDom.getSingleItem({ id });
        setSingleItem(dt[0]);
        // get Cast
        TMDBApi.getCasts(movie ? "movie" : "tv", id).then((res) =>
          setCast(res)
        );
      } catch (error) {
        try {
          logError(error);
        } catch (error) {
          console.log(error?.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, movie]);

  useLayoutEffect(() => {
    goToTop();
  }, [id]);

  const watch_item_data = useMemo(() => single_item, [single_item]);

  useEffect(() => {
    if (single_item?.MovieID || single_item?.TVID) {
      // getRelated Items
      if (single_item?.MovieID) {
        MovieDom.getMovies({
          category: single_item.MovieCategory || "",
          genre: single_item?.MovieGenre || "",
          limit: 15,
        }).then((dt) =>
          setRelatedItems(
            dt?.filter((item) => item?.MovieID !== single_item?.MovieID)
          )
        );
      } else {
        MovieDom.getTVShows({
          category: single_item?.TVcategory || "",
          genre: single_item?.TVgenre || "",
          limit: 15,
        }).then((dt) =>
          setRelatedItems(dt?.filter((item) => item.TVID !== single_item?.TVID))
        );
      }
    }
  }, [single_item]);

  useTitle(
    `${site?.name || MovieDom?.appName}-${
      single_item?.MovieTitle || single_item?.TVtitle
    }`
  );

  if (loading) return <SiteLoading />;
  if (!single_item) return <NotFound />;

  return (
    <Layout
      style={{
        backgroundColor: `#0b101d`,
        backdropFilter:"blur(5px)",
        backgroundImage: `url(${getServerImgPath(
          single_item.MovieID || single_item.TVID,
          single_item.backdrops_Poster || single_item.TVbackdrops,
          single_item.MovieID ? "movie" : "tv",
          "cover"
        )}), linear-gradient(45deg, hotpink,indigo)`,
      }}
    >
      {!SINGLE_PAGE_PLAYER.value && (
        <Player data={watch_item_data} movie={movie} />
      )}
      <Details data={single_item} />
      <div className="mt-4">
        {!movie && SINGLE_PAGE_PLAYER.value && (
          <Episodes data={watch_item_data} single_page_player />
        )}
        <Cast casts={cast} />
      </div>
      {related_items.length && (
        <Container className="mt-5">
          <RelatedItems
            title="You may like"
            route={single_item?.MovieID ? "/movies" : "/tv-series"}
            data={related_items}
            type={single_item.MovieID ? "movie" : "tv-series"}
            filter={{
              category:
                single_item.MovieCategory || single_item.TVcategory || "",
              genre: single_item.MovieGenre || single_item.TVgenre || "",
            }}
          />
        </Container>
      )}
    </Layout>
  );
};

export default Watch;
