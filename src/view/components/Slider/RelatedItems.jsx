import React, { useRef } from "react";
import { Navigation } from "swiper";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Devider,
  SliderNavigator,
  SliderSectionHeader,
} from "../../../style/common/Slider";
import { A } from "../../../style/common/Tag";
import { H4 } from "../../../style/typography/typography";
import Card from "../common/Card";

export const swiper_slier_breakpoints = {
  400: {
    slidesPerView: 2.2,
  },
  600: {
    slidesPerView: 3.2,
  },
  800: {
    slidesPerView: 4.2,
  },
  1024: {
    slidesPerView: 5.2,
  },
  1240: {
    slidesPerView: 6.2,
  },
  1440: {
    slidesPerView: 7.2,
  },
};

export const backdrop_slider_breakpoints={
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
      slidesPerView: 6.2,
    },
  };

const RelatedItems = ({ title, type, route = "/", filter = {}, data = [] }) => {
  const next_nav_ref = useRef(null);
  const prev_nav_ref = useRef(null);

  return (
    <div>
      <SliderSectionHeader>
        <H4>{title}</H4>
        <Devider />
      </SliderSectionHeader>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: next_nav_ref.current,
          prevEl: prev_nav_ref.current,
        }}
        spaceBetween={10}
        breakpoints={
          type === "movie"
            ? swiper_slier_breakpoints
            : backdrop_slider_breakpoints
        }
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Card backdrop={!!item.TVID} data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="d-flex center gap-2">
        <div className="d-flex gap-2 my-2">
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
    </div>
  );
};

export default RelatedItems;
