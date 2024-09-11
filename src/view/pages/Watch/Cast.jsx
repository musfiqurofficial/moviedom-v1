import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Devider, SliderSection, SliderSectionHeader } from "../../../style/common/Slider";
import { H4 } from "../../../style/typography/typography";
import CastCard from "../../components/common/CastCard";
import { swiper_slier_breakpoints } from "../../components/Slider/RelatedItems";

const Cast = ({ casts = [] }) => {
  const next_nav_ref = useRef(null);
  const prev_nav_ref = useRef(null);
  return !!casts.length ? (
    <section className='my-3'>
      <Container>
        <SliderSection>
          <SliderSectionHeader className="py-2" as={Container} fluid jc="flex-start">
            <H4>Cast</H4>
            <Devider />
          </SliderSectionHeader>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: next_nav_ref.current,
              prevEl: prev_nav_ref.current,
            }}
            className='px-3'
            spaceBetween={10}
            breakpoints={swiper_slier_breakpoints}
          >
            {casts.map((item, index) => (
              <SwiperSlide key={index}>
                <CastCard cast={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderSection>
      </Container>
    </section>
  ) : (null);
};

export default Cast;
