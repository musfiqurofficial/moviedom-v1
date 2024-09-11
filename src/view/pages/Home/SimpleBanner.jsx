import React from "react";
import { Autoplay, Pagination } from "swiper";
import { getServerImgPath } from "../../../lib/tools";
import Image from "../../components/common/Image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Button, Col, Row } from "react-bootstrap";
import { A } from "../../../style/common/Tag";
import { NavLink } from "react-router-dom";
import theme from "../../../style/theme";
import "swiper/css/pagination";
import { useMediaQuery } from "react-haiku";

const SimpleBanner = ({ data }) => {
  data = data?.slice(0, 5) || [];
  const breakpoint = useMediaQuery("(max-width: 600px)");

  if (!data && !data?.length) return null;
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        playOnMouseLeave: true,
      }}
      className="basic-home-banner-slider"

    >
      {data?.map((item, index) => (
        <SwiperSlide
          key={index}
          className="d-flex align-items-end"
          style={{
            minHeight: "560px",
            height: "100vh",
            maxHeight: "75vh",
          }}
        >
          <div
            className="overlay   position-absolute top-0 left-0 w-100"
            style={{
              zIndex: -1,
              height: "100%",
            }}
          >
            <Image
              src={
                breakpoint
                  ? getServerImgPath(
                      item.MovieID,
                      item.poster,
                      "movie",
                      "poster",
                      true
                    )
                  : getServerImgPath(
                      item.MovieID,
                      item.backdrops_Poster,
                      "movie",
                      "screen",
                      true
                    )
              }
              type="screen"
              className="background-image w-100"
              style={{
                height: "100%",
                objectFit: "cover",
                objectPosition:breakpoint?'top':'center'
              }}
            />
          </div>
          <div
            className="container-fluid px-2 px-md-4 px-lg-5 pb-5"
            style={{
              zIndex: 10,
              backgroundImage: `linear-gradient(to top,${theme.dark_lt} 10%,transparent 100%)`,
            }}
          >
            <Row className="">
              <Col xs={12} md={6}>
                <h3 className="text-light fw-bold text-shadow">
                  {item.MovieTitle || item.TVtitle}
                  <span className="year">( {item.MovieYear} )</span>
                </h3>
                <ul className="tags d-flex flex-wrap gap-2 align-items-center p-0 mb-2">
                  <A
                    as={NavLink}
                    to={`/${item.MovieID ? "movies" : "tv-series"}?category=${
                      item.MovieCategory || item.TVcategory
                    }`}
                    className="tag px-3 py-1 rounded-pill"
                  >
                    {item.MovieCategory || item.TVcategory}
                  </A>
                  {[...item?.MovieGenre?.trim()?.split(",")].map(
                    (genre_item) =>
                      genre_item && (
                        <A
                          as={NavLink}
                          to={`/${
                            item.MovieID ? "movies" : "tv-series"
                          }?genre=${genre_item}`}
                          key={genre_item}
                          className="tag  px-3 py-1 rounded-pill"
                        >
                          {genre_item}
                        </A>
                      )
                  )}
                </ul>
                <p className="desc line-2 text-light text-shadow mb-2">
                  {item.MovieStory}
                </p>
                <Button
                  as={NavLink}
                  to={`${item.MovieID ? "movies" : "tv-series"}/${
                    item.MovieID || item.TVID
                  }`}
                  className="rounded-pill px-4 py-2"
                >
                 <span style={{fontWeight:'500',letterSpacing:1}}> Play Now</span> <i class="ms-2 fa-regular fa-circle-play"></i>
                </Button>
              </Col>
            </Row>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SimpleBanner;
