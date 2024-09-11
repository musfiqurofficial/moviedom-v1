import "bootstrap/dist/css/bootstrap.min.css";
import "plyr-react/plyr.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import "swiper/css";
import MovieDom, {
  SINGLE_PAGE_PLAYER,
  accessible_urls,
  getPublicJSON
} from "./Api/MovieDom";
import { _HIDDEN_DATE_PROP, _HIT_ORIGIN } from "./constant";
import { checkIsExpired, goToTop } from "./lib/tools";
import {
  update_const_menu,
  update_movies_menu,
  update_tv_series_menu
} from "./redux/slice/menu-slice";
import { updateSite } from "./redux/slice/site-slice";
import "./style/css/main.css";
import { Wrapper } from "./style/global";
import theme from "./style/theme";
import { logDevice } from "./test";
import Layout from "./view/components/Layout/Layout";
import Navbar from "./view/components/Layout/Navbar";
import CastPage, { CastIndex, CastProfile } from "./view/pages/Cast/Cast";
import Home from "./view/pages/Home/Home";
import LiveTV from "./view/pages/LiveTv/LiveTV";
import Movies from "./view/pages/Movies/Movies";
import Blocked from "./view/pages/Others/Blocked";
import MembershipAlert from "./view/pages/Others/MembershipAlert";
import NotFound from "./view/pages/Others/NotFound";
import Request from "./view/pages/Others/Request";
import SiteLoading from "./view/pages/Others/SiteLoading";
import Search from "./view/pages/Search/Search";
import TVSeries from "./view/pages/TVSeries/TVSeries";
import Watch from "./view/pages/Watch/Watch";
import Games from "./view/pages/software-games/Games";
import Software from "./view/pages/software-games/Software";
import Player from "./view/player/Player";

function App() {
  const dispatch = useDispatch();
  const site = useSelector((store) => store.site);
  const [error, setError] = useState(false);


  async function siteAccessibility() {
    let accessible_origins = accessible_urls;
    let sites = [];
    try {
      const { data } = await getPublicJSON('sites.json');
      if (!Array.isArray(data)) return;
      sites = data.filter(e=>!e?.disabled);
      accessible_origins = [sites.filter(e => !e.disable).map(e => e.origins), ...accessible_urls].flat(Infinity);
    } catch (error) {
      new Error(`Can't find 'sites.json' in root directory.`);
    } finally {
      // ⭐ ACCESSIBLE ORIGIN CHECKING-->
      for (const item of accessible_origins) {
        const isValidUrl = item.includes(_HIT_ORIGIN);
        if (isValidUrl) {
          dispatch(updateSite({ blocked: false }));
          break;
        }
        dispatch(updateSite({ blocked: true }));
      }
      const site = sites.filter(e => !e.disable).find(site => {
        return !![...site.origins].find(e => e.includes(_HIT_ORIGIN))
      })
      dispatch(updateSite({ site }))
    }

  }

  useEffect(() => {
    logDevice();
    goToTop();
    dispatch(updateSite({ site_loading: true }));
    setError(false);
    // Fetch Menu-->
    getPublicJSON("menu.json")
      .then((res) => {
        dispatch(update_const_menu(res.data));
      })
      .catch((err) => console.warn(err));
    MovieDom.getYears("movie").then((dt) => {
      const data = dt?.sort((a, b) => b.name - a.name);
      dispatch(update_movies_menu({ years: data }));
    });
    MovieDom.getCategories("movie").then((dt) =>
      dispatch(update_movies_menu({ category: dt }))
    );
    MovieDom.getCategories("tv").then((dt) =>
      dispatch(update_tv_series_menu({ category: dt }))
    );
    MovieDom.getGenres("movie").then((dt) =>
      dispatch(update_movies_menu({ genre: dt }))
    );
    MovieDom.getGenres("tv").then((dt) =>
      dispatch(update_tv_series_menu({ genre: dt }))
    );
    //⭐SITE EXPIRE  DATE  CHECKING-->
    getPublicJSON("manifest.json")
      .then((res) => {
        const data = res.data;
        const is_membership_allowed = data._am;
        if(!is_membership_allowed) {
          dispatch(updateSite({ expired: false}));
          return;
        }
        const year = data[_HIDDEN_DATE_PROP.year] - 111111;
        const month = data[_HIDDEN_DATE_PROP.month] - 51;
        const date = data[_HIDDEN_DATE_PROP.date] - 20;
        if (year && date) {
          const expire_date = new Date(year, month, date);
          const isExpired = checkIsExpired(expire_date);
          dispatch(updateSite({ expired: isExpired }));
          if (isExpired) throw new Error("Site is expired");
        } else {
          dispatch(updateSite({ expired: true }));
        }
      })
      .then(async () => {
        await siteAccessibility();
      })
      .catch((error) => {
        dispatch(updateSite({ expired: true }));
        setError(true);
      })
      .finally(() => {
        dispatch(updateSite({ site_loading: false }));
      });
    MovieDom.viewCount().then(() => console.log("YOU ARE ON THE SITE"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (site.site_loading) {
    return <SiteLoading />;
  }

  if (site.expired) {
    return <MembershipAlert />;
  } else if (site.blocked) {
    return <Blocked />;
  } else if (error) {
    return <NotFound />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-series" element={<TVSeries />} />
          <Route path="search" element={<Search />} />
          <Route path="request" element={<Request />} />
          <Route path="live" element={<LiveTV />} />
          <Route path={`movies/:id`} element={<Watch movie />} />
          <Route path={`tv-series/:id`} element={<Watch />} />
          <Route path={`software`} element={<Software />} />
          <Route path={`games`} element={<Games />} />
          {/**
           * @player
           */}
          {SINGLE_PAGE_PLAYER.value && (
            <>
              <Route
                path={"/movies/:movie_id/play"}
                element={<Player movie />}
              />
              <Route path={"/tv-series/:tv_id/play"} element={<Player />} />
            </>
          )}

          <Route path="cast" element={<CastPage />}>
            <Route index element={<CastIndex />} />
            <Route path=":id" element={<CastProfile />} />
          </Route>
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
        <ToastContainer theme="dark" />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
