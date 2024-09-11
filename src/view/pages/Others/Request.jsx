import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";
import MovieDom, { getPublicJSON } from "../../../Api/MovieDom";
import { _HIT_ORIGIN } from "../../../constant";
import { getServerImgPath } from "../../../lib/tools";
import Image from "../../components/common/Image";

const STORE_NAME = "user_data_npi";
const titleCol = 3;
const inputCol = 9;
const status_type = {
  INIT: "init",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

//issue = Sound Problem & category=Movie & name=bivob & number=01768162459 & text=please upload HD fast & movie=K.G.F 2 (2022) & ip=103.269.259.23

const checkIsBDValidNumber = (number) => /^(01[346789])(\d{8})$/.test(number);

const Request = () => {
  const [searchData, setSearchData] = useState([]);

  const [my_request_list, setMyRequList] = useState([]);

  const [validated] = useState(false);

  const [issue_list, setIssueList] = useState([]);

  const [status, setStatus] = useState(status_type.INIT);

  const [userLSDataFounded, setUserLSDataFounded] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    number: "",
    ip: "",
  });

  const [requestData, setRequestData] = useState({
    movie: "",
    text: "",
    category: "Movie",
    issue: "",
  });

  const [isBDNumber, setIsBDNumber] = useState(true);

  const [setSearchDataStatus] = useState(status_type.INIT);

  const handleUserData = (e) => {
    setUserData((state) => ({ ...state, [e?.target?.name]: e?.target?.value }));
  };

  const hadleSetSearchData = (e) => {
    setSearchDataStatus(status_type.PENDING);
    const text = e.target.value;
    if (text?.length !== 0) {
      MovieDom.getSearchItems({ search: text })
        .then((dt) => {
          setSearchData(dt);
          setSearchDataStatus(status_type.SUCCESS);
        })
        .catch((err) => {
          setSearchDataStatus(status_type.ERROR);
          console.warn(err);
        });
    } else {
      setSearchDataStatus(status_type.INIT);
      setSearchData([]);
    }
  };

  const handleRequestData = (e) => {
    setRequestData((state) => ({
      ...state,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      toast.error("Form is invalidate. Please, check every field.", {
        position: "bottom-center",
      });
      return;
    }

    const params = {
      ...userData,
      ...requestData,
    };
    try {
      localStorage.setItem(STORE_NAME, JSON.stringify(userData));
    } catch (error) {
      toast.error(error.name + " : " + error.message);
    }
    toast
      .promise(
        MovieDom.sendRequestData(params),
        {
          pending: "Sending.",
          error: "Faild to send your request",
          success: "Thank you for your request.",
        },
        { position: "bottom-center" }
      )
      .then(() => {
        MovieDom.getThisUserRequest({
          ip: userData.ip,
          number: userData.number,
        })
          .then((res) => {
            setMyRequList(res);
          })
          .catch((err) => console.warn(err));
      });
  };

  useEffect(() => {
    document.title = `${MovieDom.appName}-Request`;

    setStatus(status_type.SUCCESS);
    const requ = getPublicJSON(`issue.type.json`);

    requ
      .then((res) => {
        setIssueList(res?.data?.issue_list);
        setStatus(status_type.SUCCESS);
        setRequestData((state) => ({
          ...state,
          issue: res?.data?.issue_list?.[0]?.issue,
        }));
      })
      .catch(() => setStatus(status_type.ERROR));

    return () => requ;
  }, []);

  useEffect(() => {
    const ls_user_data = JSON.parse(localStorage.getItem(STORE_NAME));
    ls_user_data?.number
      ? setUserLSDataFounded(true)
      : setUserLSDataFounded(false);
    //====>>
    const _IP = uuidv4();
    if (ls_user_data?.ip) {
      setUserData({ ...ls_user_data });
      if (ls_user_data?.ip && ls_user_data?.number) {
        MovieDom.getThisUserRequest({
          ip: ls_user_data.ip,
          number: ls_user_data.number,
        })
          .then((dt) => {
            setMyRequList(dt);
          })
          .catch((err) => console.warn(err));
      }
    } else {
      const updated_user_data = {
        ...userData,
        ip: _IP,
      };
      setUserData(updated_user_data);
      if (updated_user_data.ip && updated_user_data?.number) {
        MovieDom.getThisUserRequest({
          ip: _IP,
          number: updated_user_data?.number,
        })
          .then((dt) => {
            setMyRequList(dt);
          })
          .catch((err) => console.warn(err));
      }
      localStorage.setItem(STORE_NAME, JSON.stringify(updated_user_data));
    }
    //====>>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        minHeight: "95vh",
      }}
    >
      <div className="request-page text-light">
        <Container className="center pt-3" style={{ paddingBottom: 30 }}>
          <Row
            className="w-100 g-3"
            style={{
              minHeight: "inherit",
            }}
          >
            <Col
              xs={12}
              md={{
                span: 8,
                offset:
                  my_request_list.length !== 0 &&
                  (userData?.name || userData?.ip || userData?.number)
                    ? 0
                    : 2,
              }}
            >
              {status === status_type.INIT || status === status_type.PENDING ? (
                <>
                  <h3>Loading...</h3>
                </>
              ) : status === status_type.SUCCESS ? (
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  className="py-4 px-2 px-md-3"
                >
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={titleCol}>
                      Name
                    </Form.Label>
                    <Col sm={inputCol}>
                      <Form.Control
                        className="bg-dark border-0  text-light"
                        required
                        size="lg"
                        type="text"
                        readOnly={userLSDataFounded}
                        value={userData?.name}
                        placeholder="Your Name"
                        name="name"
                        onChange={(e) => {
                          !userLSDataFounded && handleUserData(e);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={titleCol}>
                      Phone Number
                    </Form.Label>
                    <Col sm={inputCol}>
                      <Form.Control
                        className="bg-dark border-0 text-light"
                        type="tel"
                        size="lg"
                        required
                        value={userData?.number}
                        readOnly={userLSDataFounded}
                        placeholder="017__ ______"
                        name="number"
                        onChange={(e) => {
                          if (!userLSDataFounded) {
                            handleUserData(e);
                            e?.target?.value?.length
                              ? setIsBDNumber(
                                  checkIsBDValidNumber(e.target.value)
                                )
                              : setIsBDNumber(true);
                          }
                        }}
                      />
                      {!isBDNumber && (
                        <p className="text-danger fw-bold mt-2">
                          This Number is Not Valid
                        </p>
                      )}
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={{ span: inputCol, offset: titleCol }}>
                      <Row xs={1} className="mb-3">
                        <Col
                          md={4}
                          className="requfor-tab d-flex justify-content-center align-items-start flex-row flex-md-column"
                          style={{ gap: 10 }}
                        >
                          <Form.Group as={Row} className="mb-3 col">
                            <Form.Label column sm={12}>
                              Request for
                            </Form.Label>
                            <Col>
                              <Form.Select
                                className="bg-dark border-0 text-light"
                                size="lg"
                                name="issue"
                                style={{
                                  fontSize: "16px",
                                }}
                                defaultValue={requestData.issue}
                                onChange={handleRequestData}
                              >
                                {issue_list?.map((item, index) => (
                                  <option
                                    value={item.issue}
                                    selected={index === 0 ? true : false}
                                  >
                                    {item.issue}
                                  </option>
                                ))}
                              </Form.Select>
                            </Col>
                          </Form.Group>
                        </Col>
                        <Col
                          md={3}
                          className="requfor-tab mb-3"
                          style={{ gap: 10 }}
                        >
                          <Row xs={2} md={1} className="g-2">
                            <Col>
                              <Button
                                className={
                                  requestData.category === "Movie"
                                    ? "active"
                                    : ""
                                }
                                variant="dark w-100 requ-type-btn"
                                onClick={() =>
                                  setRequestData((state) => ({
                                    ...state,
                                    category: "Movie",
                                  }))
                                }
                              >
                                Movie
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                className={
                                  requestData.category === "TV" ? "active" : ""
                                }
                                variant="dark  w-100 requ-type-btn"
                                onClick={() =>
                                  setRequestData((state) => ({
                                    ...state,
                                    category: "TV",
                                  }))
                                }
                              >
                                TV Series
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={5}>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={12}>
                              {requestData.category === "Movie"
                                ? "Movie"
                                : "TV Series"}{" "}
                              Name
                            </Form.Label>
                            <Col sm={12}>
                              <Form.Control
                                size="lg"
                                className="bg-dark border-0 text-light"
                                required
                                type="text"
                                placeholder={`${
                                  requestData.category === "Movie"
                                    ? "Movie"
                                    : "TV Series"
                                } Name`}
                                name="movie"
                                onChange={(e) => {
                                  hadleSetSearchData(e);
                                  handleRequestData(e);
                                }}
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <fieldset>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label as="legend" column sm={titleCol}>
                        Description
                      </Form.Label>
                      <Col sm={inputCol}>
                        <FormControl
                          size="lg"
                          className="bg-dark border-0 text-light"
                          required
                          as="textarea"
                          placeholder="Write your message"
                          name="text"
                          onChange={handleRequestData}
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>
                  <Form.Group className="mb-3 text-center form-btns">
                    <Button type="submit" variant="dark" className="me-3">
                      Submit
                    </Button>
                    <Button
                      type="reset"
                      style={{ background: "#ff000090" }}
                      variant="danger"
                    >
                      Reset
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <h3>Ops...!</h3>
              )}
            </Col>

            {my_request_list.length !== 0 &&
              (userData?.name || userData?.ip || userData?.number) && (
                <Col xs={12} md={4}>
                  <div className="side-box">
                    <div className="side-box-head">
                      <h3 className="hello">Hello !</h3>
                      {userData?.name && (
                        <h3 className="title">{userData?.name}</h3>
                      )}
                      {userData?.number && (
                        <p className="sub-text">Phone : {userData?.number}</p>
                      )}
                      {/* {userData?.ip && (
                        <p className="sub-text">id : {userData?.ip}</p>
                      )} */}
                    </div>
                    <div className="side-box-content-wrapper my-request-wrapper">
                      {my_request_list?.map((_, index) => (
                        <div className="my-requ-item">
                          <div className="content" key={index}>
                            <div className="box-1 center flex-column gap-2">
                              <img
                                src={`${_HIT_ORIGIN}/avatar.png`}
                                style={{ borderRadius: 1000, maxWidth: 60 }}
                                alt=""
                              />
                              {_.action === "pending" ? (
                                <span className="status pending">pending</span>
                              ) : (
                                <span className="status published">
                                  published
                                </span>
                              )}
                            </div>
                            <div className="box">
                              <h4 className="title">
                                {_.Rcategory.includes("ovie") ? "Movie" : "TV"}{" "}
                                : {_.MovieName}
                              </h4>
                              <p className="sub-text"></p>
                              <p className="sub-text">Issue : {_.Rissue}</p>
                              <p
                                className="sub-text text-in-2"
                                style={{ wordBreak: "break-all" }}
                              >
                                Details : {_.Rtext}
                              </p>
                            </div>
                          </div>
                          {_.Rreply && (
                            <>
                              <hr />
                              <div className="reply content ms-auto">
                                <img
                                  src={`${_HIT_ORIGIN}/reply-avatar.png`}
                                  alt=""
                                  className="rounded-full"
                                />

                                <div className="reply-ans-box">
                                  <h4 className="title">
                                    {MovieDom.appName} Support
                                  </h4>
                                  <p className="sub-text">{_.Rreply}</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              )}
          </Row>
        </Container>
      </div>
      <div>
        {requestData?.movie?.length !== 0 && searchData.length !== 0 && (
          <div>
            <div className="container">
              <h4 className="text-light slider-heading">
                Can you find your{" "}
                {requestData.category === "Movie" ? "movie" : "TV series"} here
                ?
              </h4>
            </div>
            <Swiper
              spaceBetween={5}
              breakpoints={{
                240: {
                  slidesPerView: 3.2,
                },
                640: {
                  slidesPerView: 6.2,
                },
                670: {
                  slidesPerView: 11.2,
                },
                1460: {
                  slidesPerView: 10.2,
                },
                1920: {
                  slidesPerView: 14.2,
                },
              }}
              navigation={{
                prevEl: ".slider-button-prev",
                nextEl: ".slider-button-next",
              }}
              modules={[Navigation]}
              className="navigation-slider"
            >
              {searchData?.length !== 0 &&
                searchData &&
                searchData
                  ?.filter((item) =>
                    requestData?.category?.includes("Movie")
                      ? item?.MovieID
                      : item?.TVID
                  )
                  ?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <NavLink
                        to={`/${item.MovieID ? "movies" : "tv-series"}/${
                          item.MovieID || item.TVID
                        }`}
                        style={{ width: "100%" }}
                      >
                        {/*eslint-disable-next-line react/jsx-no-undef*/}
                        <Image
                          poster
                          type="poster"
                          className="w-100"
                          src={getServerImgPath(
                            item.MovieID || item.TVID,
                            item.poster || item.TVposter,
                            item.MovieID ? "movie" : "tv",
                            "poster"
                          )}
                          alt=""
                        />
                      </NavLink>
                    </SwiperSlide>
                  ))}
              <div className="slider-button-prev">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 3.093l-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"
                  ></path>
                </svg>
              </div>
              <div className="slider-button-next">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 13.887l5-5V8.18l-5-5-.707.707 4.146 4.147H2v1h10.44L8.292 13.18l.707.707z"
                  ></path>
                </svg>
              </div>
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default Request;
