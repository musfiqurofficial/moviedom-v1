import Plyr from "plyr-react";
import React, { useEffect, useRef, useState } from "react";
import { Container, Modal, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieDom from "../../../Api/MovieDom";
import {
  getEpisodImg,
  getS0E0,
  getServerImgPath,
  saveFile
} from "../../../lib/tools";
import { Button } from "../../../style/common/Button";
import {
  Devider,
  SliderSection,
  SliderSectionHeader
} from "../../../style/common/Slider";
import theme from "../../../style/theme";
import { H4, P } from "../../../style/typography/typography";
import Image from "../../components/common/Image";

export const Episodes = ({
  movie,
  updatePlayerData = () => {},
  data,
  playerData = {},
  single_page_player,
}) => {
  const next_nav_ref = useRef(null);
  const prev_nav_ref = useRef(null);

  const [episodes, setEpisodes] = useState([]);
  const season_number = episodes?.[episodes?.length - 1]?.season_number;

  useEffect(() => {
    MovieDom.getTVEpisodes({ tvid: data.TVID }).then((dt) => {
      updatePlayerData(dt[0]);
      setEpisodes(dt);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.TVID]);

  function renderCard(episode) {
    return (
      <div className="episode" onClick={() => updatePlayerData(episode)}>
        <Image
          src={getEpisodImg(
            episode.TVID,
            episode.season_number,
            episode.episode_number,
            episode.still_path
          )}
          alt=""
          className="w-100 cover rounded-3"
        />
        <small className="mt-1 d-block text-light">{`S${getS0E0(
          episode.season_number
        )} E${getS0E0(episode.episode_number)}`}</small>
        <div className="d-flex justify-content-between align-items-center">
          <P className="line-1 mb-0 flex-grow-1">{episode.name}</P>
          <Button
            onClick={() =>
              saveFile(episode?.watchlink, `${data.TVtitle}-${episode?.name}`)
            }
            className="p-2 rounded-pill center "
          >
            <i className="fas fa-download"></i>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!movie && (
        <Container className="px-0 my-3 rounded-3 overflow-hidden">
          <SliderSection className="px-2 py-3">
            <SliderSectionHeader className="pt-2">
              <H4>EPISODES</H4>
              <Devider />
            </SliderSectionHeader>
            {episodes?.length && (
              <Tabs
                defaultActiveKey={+season_number}
                id="episode-tab"
                className="border-0 episode-slider"
              >
                {[...Array(+season_number)].map((ele, i) => (
                  <Tab
                    title={`Season ${i + 1}`}
                    eventKey={i + 1}
                    tabClassName="bg-none me-3"
                  >
                    <Swiper
                      modules={[Navigation]}
                      navigation={{
                        nextEl: next_nav_ref.current,
                        prevEl: prev_nav_ref.current,
                      }}
                      className="py-2"
                      spaceBetween={0}
                      breakpoints={{
                        400: {
                          slidesPerView: 2.2,
                        },
                        600: {
                          slidesPerView: 2.2,
                        },
                        800: {
                          slidesPerView: 3.2,
                        },
                        1024: {
                          slidesPerView: 3.2,
                        },
                        1240: {
                          slidesPerView: 4.2,
                        },
                        1440: {
                          slidesPerView: 6.2,
                        },
                      }}
                    >
                      {episodes
                        ?.filter((ele) => +ele.season_number === i + 1)
                        ?.map((episode, index) => (
                          <SwiperSlide
                            key={index}
                            className="p-2 rounded-3 episode-slider-card"
                            style={{
                              backgroundColor:
                                episode?.EPIID === playerData?.EPIID
                                  ? theme.light + "10"
                                  : "none",
                            }}
                          >
                            {single_page_player ? (
                              <NavLink
                                to={`/tv-series/${episode.TVID}/play?episode=${episode.EPIID}`}
                                className="d-block text-decoration-none"
                              >
                                {renderCard(episode)}
                              </NavLink>
                            ) : (
                              renderCard(episode)
                            )}
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Tab>
                ))}
              </Tabs>
            )}
          </SliderSection>
        </Container>
      )}
    </>
  );
};

export const Trailer = ({ data }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="py-2 px-3 me-2 " style={{backgroundColor:'#ffffff10'}} light onClick={handleShow}>
        <i className="fa-brands fa-youtube"></i>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        style={{
          background: theme.dark + 80,
          backdropFilter: "blur(3px)",
        }}
      >
        <div
          style={{
            background: theme.dark_lt,
          }}
        >
          <Modal.Header closeButton closeVariant="white">
            <Modal.Title as={H4}>
              {data?.MovieTitle || data?.TVtitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rounded-3 overflow-hidden bg-danger">
              <Plyr
                autoPlay={show}
                source={{
                  type: "video",
                  sources: [
                    {
                      src:
                        data?.MovieTrailer?.trim()?.split(",")[0] ||
                        data?.TVtrailer?.trim()?.split(",")[0],
                      provider: "youtube",
                    },
                  ],
                }}
              />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

const Player = ({ data, movie }) => {
  const [playerData, setPlayerData] = useState({});
  const [VIDEO_SRC, setVideoSrc] = useState("");
  const { site } = useSelector((store) => store.site);

  const ref = useRef();
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  function updatePlayerData(data) {
    setPlayerData(data);
  }

  useEffect(() => {
    setPlayerData(data);
  }, [movie, data]);

  useEffect(() => {
    const DEF_SRC = playerData?.watchlink || playerData?.MovieWatchLink;
    if (!DEF_SRC) return;
    try {
      const src = new URL(DEF_SRC);
      if (!site?.root_origin) throw new Error("'site.root_origin' is undefined");
      setVideoSrc(site?.root_origin + src?.pathname);
    } catch (error) {
      console.error(error);
      setVideoSrc(DEF_SRC);
    }
  }, [playerData?.watchlink, playerData?.MovieWatchLink, site?.root_origin]);


  function renderPlayer() {
    return (
      <>
        <Container
          className=" p-2 p-lg-3 rounded-2 mb-3 rounded-3"
          style={{
            background: theme.dark_lt + "70",
            backdropFilter: "blur(2px)",
          }}
        >
          <Plyr
            ref={ref}
            playsInline
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
              disableContextMenu: true,
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
              poster: data?.MovieID
                ? getServerImgPath(
                    data?.MovieID,
                    data?.backdrops_Poster,
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
              forceHLS: isSafari,
              forceVideo: true,
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
        </Container>
        <Container
          className="p-2 p-lg-3 rounded-2"
          style={{
            background: theme.dark_lt + "70",
            backdropFilter: "blur(2px)",
          }}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div>
              <Trailer data={data} />
              <Button
                className="py-2 px-3"
                onClick={() =>
                  saveFile(
                    playerData?.MovieWatchLink || playerData?.watchlink,
                    playerData?.MovieID
                      ? `${playerData?.MovieTitle}`
                      : `${data?.TVtitle}-${playerData?.name}`
                  )
                }
              >
                Download{" "}
                <small className="fs-12px">
                  ({playerData?.MovieSize || "_ _"})
                </small>{" "}
                <i class="fa-solid fa-file-arrow-down"></i>
              </Button>
            </div>
            <P className="pe-2 mb-0">
              {movie
                ? playerData?.MovieTitle
                : ` S${playerData?.season_number || ""}E${
                    playerData?.episode_number || ""
                  } - ${playerData?.name || ""}`}
            </P>
          </div>
        </Container>
      </>
    );
  }

  return (
    <section className="py-5">
      {renderPlayer()}
      {/* Episodes */}
      {!movie && (
        <Episodes
          data={data}
          playerData={playerData}
          updatePlayerData={updatePlayerData}
        />
      )}
    </section>
  );
};

export default React.memo(Player);
