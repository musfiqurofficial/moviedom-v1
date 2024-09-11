import Plyr from "plyr-react";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Dropdown,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useHover, useTitle } from "react-haiku";
import { useSelector } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MovieDom from "../../Api/MovieDom";
import { getEpisodImg, getServerImgPath, saveFile } from "../../lib/tools";
import { logError } from "../../test";
import Image from "../components/common/Image";

const TopBar = ({
  episodes = [],
  movie,
  title = "",
  parent = {},
  playerData = {},
  style = {},
}) => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { hovered, ref } = useHover();
  function handleClose() {
    setShow(false);
  }
  function onGoBack() {
    navigate(location.pathname.replace("/play", ""));
  }

  useLayoutEffect(() => {
    let timer = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className="position-absolute top-0 left-0 w-100 text-light px-2 py-3 d-flex justify-content-between gap-2 align-items-center"
        ref={ref}
        style={{
          zIndex: 10,
          backgroundImage: "linear-gradient(to bottom, #00000040,transparent)",
          opacity: hovered ? 1 : 0.8,
          transition: "0.2s linear",
        }}
      >
        <button
          className="player-btn btn border-0 btn-outline-light"
          onClick={onGoBack}
        >
          <i class="fa-solid fa-arrow-left-long "></i>
        </button>
        <p className="mb-0 text-shadow fw-bold">{title}</p>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <a
            href={playerData?.MovieWatchLink || playerData?.watchlink}
            target="_blank"
            className="player-btn btn border-0 btn-outline-light" rel="noreferrer"
            // onClick={() =>
            //   saveFile(
            //     playerData?.MovieWatchLink || playerData?.watchlink,
            //     playerData?.MovieID
            //       ? `${playerData?.MovieTitle}`
            //       : `${parent?.TVtitle}-${playerData?.name}`
            //   )
            // }
          >
            <i class="fa-solid fa-file-arrow-down"></i>
          </a>
          {!movie && (
            <button
              className="player-btn btn border-0 btn-outline-light"
              onClick={() => setShow((s) => !s)}
            >
              <i class="fa-solid fa-list-ol"></i>
            </button>
          )}
        </div>
      </div>
      {!movie && (
        <Seasons
          show={show}
          handleClose={handleClose}
          episodes={episodes}
          playerData={playerData}
          parent={parent}
        />
      )}
    </>
  );
};
const Seasons = ({ show, handleClose, episodes, playerData, parent }) => {
  const final_season = episodes?.length
    ? +episodes[episodes.length - 1].season_number
    : 0;
  const [season, setSeason] = useState(final_season);
  const [epis, setEpis] = useState([]);

  function onChangeSeason(season) {
    setSeason(+season);
    setEpis(episodes?.filter((ele) => +ele.season_number === +season) || []);
  }

  useLayoutEffect(() => {
    setSeason(final_season);
    setEpis(
      episodes?.filter((ele) => +ele.season_number === +final_season) || []
    );
  }, [final_season, episodes]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={"end"}
      variant="light"
      className="bg-dark text-light"
      aria-labelledby="offcanvasDarkLabel"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>
          Season{" "}
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              {season}
            </Dropdown.Toggle>
            <Dropdown.Menu
              variant="dark"
              style={{
                minWidth: "4rem",
              }}
            >
              {[...Array(final_season)]
                .map((_, i) => i + 1)
                .sort((a, b) => b - a)
                .map((ele) => (
                  <Dropdown.Item
                    onClick={() => onChangeSeason(ele)}
                    className={`${season === ele ? "bg-secondary" : ""}`}
                  >
                    {ele}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="overflow-y-scroll">
        {epis.map((episode) => (
          <Card
            className="bg-dark plyr player-episode-card border-2 rounded-3 overflow-hidden mb-2"
            style={{
              borderColor:
                +playerData.EPIID === +episode.EPIID ? "#ffffff" : "",
            }}
          >
            <Row className="g-2">
              <Col xs={5}>
                <Image
                  src={getEpisodImg(
                    episode.TVID,
                    episode.season_number,
                    episode.episode_number,
                    episode.still_path
                  )}
                  alt=""
                  className="w-100 cover card-img"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col xs={7}>
                <Card.Body className="bg-dark my-0 p-0 py-1">
                  <Card.Title
                    className="h6 fw-bold mb-1 text-in-one"
                    title={episode.name}
                  >
                    {episode.name}
                  </Card.Title>
                  <Card.Text>
                    <>
                      <span className="p-1 me-2 rounded-2 border-1 border border-secondary">
                        S{episode.season_number}
                      </span>
                      <span className="p-1 me-2 rounded-2 border-1 border border-secondary">
                        E{episode.episode_number}
                      </span>
                    </>
                    <ButtonGroup>
                      <Button
                        variant="dark"
                        onClick={() =>
                          saveFile(
                            episode?.watchlink,
                            `${parent?.TVtitle}-${episode?.name}`
                          )
                        }
                      >
                        <i class="fa-solid fa-file-arrow-down"></i>
                      </Button>
                      <Button
                        variant="dark"
                        as={NavLink}
                        to={`/tv-series/${episode.TVID}/play?episode=${episode.EPIID}`}
                      >
                        <i class="fa-solid fa-play"></i>
                      </Button>
                    </ButtonGroup>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const Player = ({ movie }) => {
  const params = useParams();
  const [count, setCount] = useState(0);
  const [VIDEO_SRC, setVideoSrc] = useState("");
  const { site } = useSelector((store) => store.site);
  const [searchParams] = useSearchParams();
  const [playerData, setPlayerData] = useState({});
  const [parent, setParent] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const epi_id = useMemo(() => searchParams.get("episode"), [searchParams]);
  const ref = useRef();
  useTitle(" Play - " + (parent?.MovieTitle || parent?.TVtitle));
  useEffect(() => {
    MovieDom.getSingleItem({ id: params?.tv_id || params?.movie_id }).then(
      (dt) => {
        const item = dt?.[0];
        setParent(item);
        setPlayerData(movie ? item : {});
        if (movie) {
          setEpisodes([]);
        }
        if (!movie) {
          MovieDom.getTVEpisodes({ tvid: params?.tv_id }).then((dt) => {
            const episode = dt?.find((ele) => +ele.EPIID === +epi_id);
            setPlayerData(episode || dt?.[0]);
            setEpisodes(dt);
          });
        }
      }
    );
  }, [movie, params, epi_id]);

  useEffect(() => {
    const DEF_SRC = playerData?.watchlink || playerData?.MovieWatchLink;
    if (!DEF_SRC) return;
    try {
      const src = new URL(DEF_SRC);
      if (!site?.root_origin)
        throw new Error("'site.root_origin' is undefined");
      setVideoSrc(site?.root_origin + src?.pathname);
    } catch (error) {
      console.error(error);
      setVideoSrc(DEF_SRC);
    }
  }, [playerData?.watchlink, playerData?.MovieWatchLink, site?.root_origin]);

  return (
    <div
      className="position-relative single-page-player"
      id="moviedom_player"
      onMouseMove={() => {
        setCount(0);
      }}
    >
      <TopBar
        episodes={episodes}
        movie={movie}
        title={parent?.MovieTitle || parent?.TVtitle + " - " + playerData?.name}
        playerData={playerData}
        parent={parent}
        style={{
          opacity: count >= 4 ? 0 : 1,
          visibility: count >= 4 ? "hidden" : "visible",
          transition: "0.2s linear",
        }}
      />
      <Plyr
        autoPlay
        ref={ref}
        style={{
          height: "100vh",
          width: "100vw",
          objectFit: "contain",
        }}
        onError={logError}
        onErrorCapture={logError}
        options={{
          controls: [
            "play-large",
            "rewind",
            "play",
            "fast-forward",
            "volume",
            "mute",
            "progress",
            "current-time",
            "settings",
            "captions",
            "airplay",
            "fullscreen",
          ],
          focused: true,
          global: true,
          settings: ["captions", "quality", "speed", "loop"],
          disableContextMenu: false,
          tooltips: { controls: true, seek: true },
        }}
        source={{
          type: "video",
          sources: [
            {
              src: VIDEO_SRC,
              type: "video/mp4",
            },
          ],
          poster: parent?.MovieID
            ? getServerImgPath(
                parent?.MovieID,
                parent?.backdrops_Poster,
                "movie",
                "cover"
              )
            : getEpisodImg(
                playerData?.TVID,
                playerData?.season_number,
                playerData?.episode_number,
                playerData?.still_path
              ),
          previewThumbnails: {
            src: playerData?.MovieSubtitle,
          },
          tracks: [
            {
              kind: "captions",
              label: "English",
              srclang: "en",
              src: playerData?.MovieSubtitle,
              default: true,
            },
          ],
        }}
      />
    </div>
  );
};

export default Player;
