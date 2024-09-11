import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { If } from "react-haiku";
import { NavLink } from "react-router-dom";
import { _STATUS } from "../../../constant";
import { getServerImgPath } from "../../../lib/tools";
import { SingleBannerStyle } from "../../../style/banner/SingleBannerStyle";
import { Button } from "../../../style/common/Button";
import { StyledNavLink } from "../../../style/common/Tag";
import { H3, P } from "../../../style/typography/typography";
import Image from "../../components/common/Image";

const SingleBanner = ({ dataObj, status }) => {
  const genre =
    dataObj?.MovieGenre?.split(",") || dataObj?.TVgenre?.split(",") || [];
  const category = dataObj?.MovieCategory || dataObj?.TVcategory || "";
  const title = dataObj?.MovieTitle || dataObj?.TVtitle || "";
  const year = dataObj?.MovieYear || dataObj?.TVrelease || "";
  const story_text = dataObj?.MovieStory || dataObj?.TVstory || "";
  const story = story_text?.split(" ")?.slice(0, 25)?.join(" ");
  const ratting = +dataObj?.MovieRatings || +dataObj?.TVRatings || 0;
  const watch_path = `/${dataObj?.MovieID ? "movies" : "tv-series"}/${
    dataObj?.MovieID || dataObj?.TVID
  }`;
  const backdrop = getServerImgPath(
    dataObj?.MovieID || dataObj?.TVID,
    dataObj?.backdrops_Poster || dataObj?.TVbackdrops,
    dataObj?.MovieID ? "movie" : "tv" || "",
    "backdrop"
  );
  const poster = getServerImgPath(
    dataObj?.MovieID || dataObj?.TVID,
    dataObj?.poster || dataObj?.TVposter,
    dataObj?.MovieID ? "movie" : "tv" || "",
    "poster",
    true
  );

  return (
    <>
      <If isTrue={status === _STATUS.failed}>{null}</If>
      <If isTrue={status === _STATUS.loading}>
        <SingleBannerStyle className="d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SingleBannerStyle>
      </If>
      <If isTrue={status === _STATUS.success}>
        <SingleBannerStyle
          bg={
            dataObj?.backdrops_Poster || dataObj?.TVbackdrops
              ? backdrop
              : poster
          }
          className="d-flex align-items-center ps-0 px-md-3 ps-lg-5 "
        >
          <div className="p-4 flex-grow-1 py-5">
            <Row className="align-items-center">
              <Col xs={12} md={8}>
                <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-start gap-3">
                  <div className="d-flex justify-content-center justify-content-md-start">
                    <Image
                      src={poster}
                      className="rounded-1 shadow-lg"
                      style={{
                        minWidth: "220px",
                        maxWidth: "60vw",
                        width: "280px",
                      }}
                    />
                  </div>
                  <div
                    xs={12}
                    md={9}
                    className="d-flex flex-column align-items-center align-items-md-start  justify-content-center"
                  >
                    <span className="d-flex align-items-center text-warning">
                      <i className="fa-solid fa-star me-1"> </i>{" "}
                      <span style={{ fontWeight: "700" }}>{ratting}</span>
                    </span>
                    <H3 className="text-shadow">
                      {title} ({year}){" "}
                    </H3>
                    <P
                      color={"text"}
                      className="list d-flex align-items-center flex-wrap gap-2 mb-1"
                    >
                      {genre?.length &&
                        genre?.map((ele, indx) => (
                          <>
                            <StyledNavLink to={`/movies?genre=${ele}`}>
                              <u>{ele}</u>
                            </StyledNavLink>
                            |
                          </>
                        ))}
                      {category && (
                        <StyledNavLink to={`/movies?category=${category}`}>
                          <u>{category}</u>
                        </StyledNavLink>
                      )}
                    </P>
                    <P className="text-in-two">{story} ... ... ...</P>
                    <div>
                      <Button className="py-2 px-3 me-2" title="Favourite">
                        <i className="fa-solid fa-heart"></i>
                      </Button>
                      <Button className="py-2 px-3 me-2" title="Play Now">
                        <i className="fa-solid fa-clock"></i>
                      </Button>
                      <NavLink to={watch_path}>
                        <Button className="py-2 px-3">
                          Play Now <i class="fa-solid fa-play ms-1"></i>
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </SingleBannerStyle>
      </If>
    </>
  );
};

export default SingleBanner;
