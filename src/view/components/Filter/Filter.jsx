import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Range, getTrackBackground } from "react-range";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { _CONTENT_TYPE, alphabet } from "../../../constant";
import { Select } from "../../../style/common/Filter";
import { Devider } from "../../../style/common/Slider";
import { H3, P } from "../../../style/typography/typography";

const Filter = ({ type }) => {
  const [values, setValues] = useState([0, 10]);
  const store = useSelector((store) => store);
  const { movies, tv_series } = store.menu;
  const [searchParams, setSearchParams] = useSearchParams();
  const query_obj = Object.fromEntries(searchParams);
  const this_year = +new Date().getFullYear();
  const dummy_years = [...Array(25)].map((ele, indx) => this_year - indx);
  const years =
    (type === _CONTENT_TYPE.MOVIES
      ? movies?.years?.length
        ? movies?.years
        : dummy_years
      : tv_series?.years?.length
      ? tv_series.years
      : dummy_years) ||
    dummy_years;

  const getValue = (property) => {
    switch (type) {
      case "movies":
        return query_obj[property] || "";
      case "tv-series":
        return query_obj[property] || "";
      case "search":
        return query_obj[property] || "";
      default:
        console.warn(`${type} can't be a case`);
    }
  };

  const handle_update_filter = (filter) => {
    setSearchParams({ ...query_obj, ...filter });
  };

  if (!type) {
    return <H3>'type' is required</H3>;
  }

  if (type === "search") {
    return (
      <input
        type="search"
        value={query_obj.search}
        onChange={(e) => handle_update_filter({ search: e.target.value })}
        className="search-input-filter p-2"
      />
    );
  }

  return (
    <div className="px-3 px-md-0 mb-3">
      <div>
        <P color="primary" className="filter-title mb-1">
          Ratting
        </P>
        <Range
          draggableTrack
          values={values}
          step={1}
          min={0}
          max={10}
          onChange={(values) => {
            setValues(values);
          }}
          onFinalChange={(value) => {
            handle_update_filter({ minrating: value[0], maxrating: value[1] });
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "10px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  background: getTrackBackground({
                    values,
                    colors: ["#ffffff50", "#04ff8e", "#ffffff50"],
                    min: 0,
                    max: 10,
                  }),
                  height: 5,
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              className="center rounded-pill"
              style={{
                ...props.style,
                height: 15,
                width: 15,
                background: "#04ff8e",
              }}
            >
              <div
                className={`${
                  isDragged ? "mdom-bg-highlight" : "mdom-bg-light-20"
                } h-5-px w-5-px`}
              />
            </div>
          )}
        />
        <div className="d-flex gap-2 justify-content-between my-1">
          <P className="mb-0">{values[0]}</P>
          <P className="mb-0">{values[1]}</P>
        </div>
      </div>
      <Devider className="my-2" />
      <div>
        <P color="primary" className="filter-title mb-1">
          Category
        </P>
        <Select
          value={getValue("category")}
          style={{color:'#ffffff'}}
          onChange={(e) => handle_update_filter({ category: e.target.value })}
        >
          <option value="">Category</option>
          {type === "movies" &&
            movies?.category?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          {type === "tv-series" &&
            tv_series?.category?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
        </Select>
      </div>
      <Devider className="my-2" />
      <div>
        <P color="primary" className="filter-title mb-1">
          Genre
        </P>
        <Select
          value={getValue("genre")}
          style={{color:'#ffffff'}}
          onChange={(e) => handle_update_filter({ genre: e.target.value })}
        >
          <option value="">Genre</option>
          {type === "movies" &&
            movies?.genre?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          {type === "tv-series" &&
            tv_series?.genre?.map((item) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
        </Select>
      </div>
      <Devider className="my-2" />
      <div>
        <P color="primary" className="filter-title mb-1">
          Year
        </P>
        <Select
          value={getValue("year")}
          style={{color:'#ffffff'}}
          onChange={(e) => handle_update_filter({ year: e.target.value })}
        >
          <option value="">Year</option>
          {type === "movies" &&
            years?.map((item) => (
              <option value={item.name || item} key={item.id || item}>
                {item.name || item}
              </option>
            ))}
          {type === "tv-series" &&
            !!years?.length &&
            years?.map((item) => (
              <option value={item.name || item} key={item.id || item}>
                {item.name || item}
              </option>
            ))}
        </Select>
      </div>
      <Devider className="my-2" />
      <div>
        <P color="primary" className="filter-title mb-1">
          Alphabet
        </P>
        <Row xs={4} className="px-2">
          {alphabet.map((item) => (
            <Col className="p-1">
              <div
                className={`w-100 p-2 rounded-3 border border-1 text-center text-light alphabet-item ${
                  (type === "movies"
                    ? item === query_obj.search
                    : item === query_obj.search) && "active"
                }`}
                onClick={() => handle_update_filter({ search: item })}
                style={{
                  borderColor: "deeppink !important",
                }}
              >
                {item}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Filter;
