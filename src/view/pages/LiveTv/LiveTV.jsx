import React, { useCallback, useEffect, useState } from "react";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useTitle } from "react-haiku";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import MovieDom from "../../../Api/MovieDom";
import { goToTop } from "../../../lib/tools";
const STATUS = {
  PENDING: "PENDING",
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  COMING: "COMING SOON",
};

function IMG({ src }) {
  const [_src, set_src] = useState(src);
  useEffect(() => {
    set_src(src ? src : "../no-logo.webp");
  }, [src]);
  return (
    <img
      src={_src}
      alt=""
      className="card-img mb-2"
      onError={() => {
        set_src("../no-logo.webp");
      }}
    />
  );
}

function LiveTVCard({ tv, onActiveTV }) {
  /**
   *@property name,logo,m3u8,id
   */
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <figure
      onClick={() => onActiveTV(tv)}
      style={{
        cursor: "pointer",
        background: "#ffffff10",
        textDecoration: "none",
      }}
      className="live-tv-card card d-block text-white p-0 m-2"
    >
      <div className="card-body p-1">
        <IMG src={tv.logo} />
        <p className="mb-0">{tv.name}</p>
      </div>
    </figure>
  );
}

export default function LiveTV() {
  const {site}=useSelector(store=>store.site);
  //STATES
  const [live_tvs, setLiveTvs] = useState([]);
  const [activeTv, setActiveTV] = useState(null);
  const [status, setStatus] = useState(STATUS.INIT);

  // SET ACTIVE TV
  function onActiveTV(params) {
    setActiveTV(params);
  }
  // RESET ACTIVE TV
  function onResetActiveTV() {
    setActiveTV(null);
  }
  // FETCH LIVE TVS
  const get_live_tvs = useCallback(async function (params) {
    setStatus(STATUS.PENDING);
    try {
      const result = await MovieDom.getLiveTvs(params);
      setLiveTvs(result);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      setLiveTvs([]);
      setStatus(STATUS.FAILED);
      console.warn(error);
    }
  }, []);
  
  useTitle(`${site?.name||MovieDom.appName} - Live`);

  // USE_EFFECT
  useEffect(() => {
    get_live_tvs();
    goToTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---> UI COMPONENTS <---
  if (status === (STATUS.INIT || STATUS.PENDING)) {
    return (
      <div style={{ height: "100vh" }} className="center">
        <Spinner animation="border" variant="white" size="lg" />;
      </div>
    );
  }
  if (status === STATUS.FAILED) {
    return <Alert variant={"danger"}>Failed to get live tvs. Try again!</Alert>;
  }
  if (status === STATUS.COMING || live_tvs.length < 1) {
    return (
      <div style={{ height: "90vh" }} className="center">
        <div className="container text-center">
          <img
            src="../coming-soon.svg"
            alt="Coming soon svg"
            className="mb-3"
            style={{ maxWidth: 340 }}
          />
          <h3 style={{ letterSpacing: 1.8 }} className="fw-bold text-secondary">
            Coming Soon!
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 px-md-3 px-lg-5  py-2 container-fluid">
      {activeTv && (
        <>
          <section className="mb-5">
            <Row className="justify-content-center">
              <Col className="col-12 col-md-10 col-md-8">
                <div
                  style={{ backgroundColor: "#ffffff10" }}
                  className="p-1 rounded-3 d-flex justify-content-center align-items-center"
                >
                  <ReactPlayer
                    url={activeTv.m3u8}
                    playing
                    style={{
                      width: "100%",
                      aspectRatio: 16 / 8,
                      objectPosition: "center",
                    }}
                    controls
                    autoPlay
                    width="100%"
                    height="auto rounded-3 overflow-hidden"
                  />
                </div>
                <div className="mt-2 d-flex justify-content-between flex-wrap gap-2">
                  <h6 className="text-white">
                    {activeTv?.name}{" "}
                    <span
                      className="ms-3 d-inline-block p-1 rounded-2 text-white"
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: 1.8,
                        backgroundImage: "linear-gradient(45deg,#f00,#b30)",
                      }}
                    >
                      LIVE
                    </span>
                  </h6>
                  <button className="btn btn-danger" onClick={onResetActiveTV}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </Col>
            </Row>
          </section>
          <hr className="border-1 border border-secondary rounded-md" />
        </>
      )}
      <section>
        <h4
          className="text-white"
          style={{ letterSpacing: 1.7, fontWeight: "600" }}
        >
          Live TV
        </h4>
        <Row className="gap-0" xs={2} sm={3} md={6} lg={8}>
          {live_tvs.map((tv) => (
            <Col key={tv.id}>
              <LiveTVCard tv={tv} onActiveTV={onActiveTV} />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}
