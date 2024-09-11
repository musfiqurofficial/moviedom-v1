import React from "react";
import { getServerImgPath } from "../../../lib/tools";
import { A, StyledNavLink, Tag, Tags } from "../../../style/common/Tag";
import { P } from "../../../style/typography/typography";
import { NavLink } from "react-router-dom";
import Image from "./Image";
import theme from "../../../style/theme";
import { Button, ButtonGroup } from "react-bootstrap";
import { CARD_TYPES, toggleCardType } from "../../../redux/slice/card-slice";
import { useDispatch, useSelector } from "react-redux";

export function CardTypeTogglers() {
  const card_store = useSelector((store) => store.card);
  const dispatch = useDispatch();

  const onSelectPoster = () => {
    dispatch(toggleCardType(CARD_TYPES.POSTER));
  };
  const onSelectBackdrop = () => {
    dispatch(toggleCardType(CARD_TYPES.BACKDROP));
  };

  const isSeleceted = (opt) => card_store.card_type === opt;
  return (
    <ButtonGroup>
      <Button
        variant="dark"
        onClick={onSelectPoster}
        style={{
          backgroundColor: isSeleceted(CARD_TYPES.POSTER) ? "#ffffff40" : "",
        }}
      >
        <i class="fa-solid fa-mobile-button"></i>
      </Button>
      <Button
        variant="dark"
        onClick={onSelectBackdrop}
        style={{
          backgroundColor: isSeleceted(CARD_TYPES.BACKDROP) ? "#ffffff40" : "",
        }}
      >
        <i
          class="fa-solid fa-mobile-button"
          style={{ transform: "rotate(-90deg)" }}
        ></i>
      </Button>
    </ButtonGroup>
  );
}

function Ratting({ ratting = 5.6 }) {
  return (
    <div className="ratting position-absolute center top-0 left-0">
      <svg
        className="center"
        style={{ width: "70%", maxWidth: 100, maxHeight: 100 }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="25%"
          fill="none"
          style={{
            stroke: "#ddd",
            strokeWidth: 2,
          }}
        />
        <circle
          cx="50%"
          cy="50%"
          r="25%"
          fill="none"
          style={{
            "--ratting": 160 - 160 * (ratting / 10) + "%",
            stroke: "deepPink",
            strokeWidth: 5,
            strokeDasharray: "160%",
            strokeLinecap: "round",
          }}
        />
      </svg>
      <div className="position-absolute h-100 w-100 center">
        <P className="mb-0">{Math.round(ratting)}</P>
      </div>
    </div>
  );
}

const Card = ({ backdrop, all_page, data = {} }) => {
  const { card_type } = useSelector((s) => s.card);
  const isPosterCard = all_page ? card_type === CARD_TYPES.POSTER : !backdrop;
  return (
    <>
      <A
        as={NavLink}
        to={
          data?.MovieID ? `/movies/${data?.MovieID}` : `/tv-series/${data.TVID}`
        }
        style={{ width: "100%" }}
        title={data.MovieTitle || data.TVtitle}
      >
        <div className="position-relative card-image">
          <Ratting ratting={+data.MovieRatings || +data.TVRatings || 0} />
          <Image
            src={getServerImgPath(
              data.MovieID || data.TVID,
              isPosterCard
                ? data.poster || data.TVposter
                : data.backdrops_Poster || data.TVbackdrops,
              data.MovieID ? "movie" : "tv",
              isPosterCard ? "poster" : "screen"
            )}
            poster={isPosterCard}
            alt={data.MovieTitle || data.TVtitle || data.name}
            className={`${isPosterCard ? "poster" : "cover"} w-100`}
          />
        </div>
      </A>
      <div className="mt-2">
        <Tags className="mb-0">
          <Tag
            as={StyledNavLink}
            to={`${data.MovieID ? "/movies" : "/tv-series"}?year=${
              data.MovieYear || data.TVrelease
            }`}
            disable_active_style
            color={theme.light + "aa"}
          >
            <small>{data.MovieYear || data.TVrelease}</small>
          </Tag>
          <Tag
            as={StyledNavLink}
            disable_active_style
            to={`${data.MovieID ? "/movies" : "/tv-series"}?category=${
              data.MovieCategory || data.TVcategory
            }`}
            color={theme.light + "aa"}
          >
            <small>{data.MovieCategory || data.TVcategory}</small>
          </Tag>
        </Tags>
        <P
          as="small"
          className="line-1"
          style={{
            fontWeight: "500",
            letterSpacing: 1,
            textAlign: "left",
          }}
        >
          {data.MovieTitle || data.TVtitle}
        </P>
      </div>
    </>
  );
};

export default Card;
