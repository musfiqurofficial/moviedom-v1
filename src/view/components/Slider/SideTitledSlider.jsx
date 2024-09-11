import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Card as BSCard,
  Spinner,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Devider, SliderNavigator } from "../../../style/common/Slider";
import { A } from "../../../style/common/Tag";
import { H3 } from "../../../style/typography/typography";
import { If } from "react-haiku";
import Card from "../common/Card";
import MovieDom from "../../../Api/MovieDom";
import { Navigation } from "swiper";
import { _STATUS } from "../../../constant";
import { NavLink } from "react-router-dom";
import {
  backdrop_slider_breakpoints,
  swiper_slier_breakpoints,
} from "./RelatedItems";

const SideTitledSlider = ({
  title = "",
  route,
  filter = {},
  data: prevData = [],
  type = "movie",
  righted,
}) => {
  const [data, setData] = useState(prevData);
  const [loading, setLoading] = useState(_STATUS.loading);

  const prev_nav_ref = useRef(null);
  const next_nav_ref = useRef(null);

  useEffect(() => {
    if (!prevData?.length) {
      setLoading(_STATUS.loading);
      switch (type) {
        case "movie":
          setLoading(_STATUS.loading);
          MovieDom.getMovies({ ...filter, limit: 15 })
            .then((dt) => {
              setData(dt);
              setLoading(_STATUS.success);
            })
            .catch(() => {
              setData([]);
              setLoading(_STATUS.failed);
            });
          break;
        case "tv-series":
          setLoading(_STATUS.loading);
          MovieDom.getTVShows({ ...filter, limit: 15 })
            .then((dt) => {
              setData(dt);
              setLoading(_STATUS.success);
            })
            .catch(() => {
              setData([]);
              setLoading(_STATUS.failed);
            });
          break;
        default:
          console.warn("`type` is required.");
          break;
      }
    }
    setLoading(_STATUS.success);
  }, [filter, type, prevData?.length]);

  const slider_nav = {
    nextEl: next_nav_ref.current,
    prevEl: prev_nav_ref.current,
  };

  return (
    <Row className={`${righted ? "flex-row-reverse" : "flex-row"}`}>
      <If isTrue={!!title}>
        <Col
          xs={12}
          md={2}
          className="center p-4 flex-column align-items-start"
        >
          <H3>{title}</H3>
          <div className="d-flex gap-2 my-2">
            <SliderNavigator className={"slider-prev"} ref={prev_nav_ref}>
              <i className="fa-solid fa-left-long"></i>
            </SliderNavigator>
            <SliderNavigator className={"slider-next"} ref={next_nav_ref}>
              <i className="fa-solid fa-right-long"></i>
            </SliderNavigator>
          </div>
          <A as={NavLink} to={`${route}?category=${filter.category}`}>
            See More
          </A>
        </Col>
      </If>
      <Col xs={12} md={!!title ? 10 : 12} className={!title && "px-4"}>
        <If isTrue={loading === _STATUS.success}>
          <Swiper
            modules={[Navigation]}
            navigation={slider_nav}
            className="px-3"
            spaceBetween={10}
            breakpoints={
              type === "movie"
                ? {
                    100: {
                      slidesPerView: 1.2,
                    },
                    400: {
                      slidesPerView: 2.2,
                    },
                    600: {
                      slidesPerView: 2.8,
                    },
                    800: {
                      slidesPerView: 3.2,
                    },
                    1024: {
                      slidesPerView: 4.2,
                    },
                    1240: {
                      slidesPerView: 5.2,
                    },
                    1440: {
                      slidesPerView: 7.2,
                    },
                    1940: {
                      slidesPerView: 8.2,
                    },
                  }
                : backdrop_slider_breakpoints
            }
          >
            {!!data.length &&
              data.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card backdrop={!!item.TVID} data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </If>
        <If isTrue={loading === _STATUS.loading}>
          <Swiper
            modules={[Navigation]}
            navigation={slider_nav}
            className="px-2"
            spaceBetween={10}
            breakpoints={swiper_slier_breakpoints}
          >
            {[...Array(10)].map((_, index) => (
              <SwiperSlide key={index}>
                <div as={BSCard.Body} className="p-0">
                  <div
                    xs={12}
                    style={{
                      height: 280,
                      aspectRatio: 2 / 3,
                    }}
                  >
                    <Spinner animation="border" role="status" variant="light">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </If>
        <If isTrue={!title}>
          <div className="center mt-2">
            <div className="d-flex gap-2">
              <SliderNavigator className={"slider-prev"} ref={prev_nav_ref}>
                <i className="fa-solid fa-left-long"></i>
              </SliderNavigator>
              <SliderNavigator className={"slider-next"} ref={next_nav_ref}>
                <i className="fa-solid fa-right-long"></i>
              </SliderNavigator>
            </div>
            <Devider />
            <A as={NavLink} to={`${route}?category=${filter.category}`}>
              See More
            </A>
          </div>
        </If>
      </Col>
    </Row>
  );
};

export default SideTitledSlider;
