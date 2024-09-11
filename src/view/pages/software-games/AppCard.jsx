import React from "react";
import { Col, Row } from "react-bootstrap";
import { _HIT_ORIGIN } from "../../../constant";

function getGameImage(dataObj, screenPoster) {
  if (screenPoster)
    return dataObj.screenposter
      ? `/Admin/main/Games/${dataObj.GamesID}/screenposter/${dataObj.screenposter}`
      : `${_HIT_ORIGIN}/no-poster.jpg`;
  else
    return dataObj.thumbposter
      ? `/Admin/main/Games/${dataObj.GamesID}/thumbposter/${dataObj.thumbposter}`
      : `${_HIT_ORIGIN}/no-poster-img.jpg`;
}
function getSoftwareImage(dataObj) {
  return dataObj.cover ? `${dataObj.cover}` : `${_HIT_ORIGIN}/no-poster.jpg`;
}

export function CardWrapper({ datas = [], game, software }) {
  return (
    <section className="py-4">
      <div className="px-2 px-md-3 px-lg-5  py-2 container-fluid">
        <Row className="g-2" xs={2} sm={3} md={4} lg={6}>
          {datas.map((ele) => (
            <Col>
              <AppCard data={ele} game={game} software={software} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default function AppCard({ data, game, software }) {
  return (
    <figure
      className="card bg-white"
      style={{ "--bs-bg-opacity": 0.05, border: "2px dashed #ffffff25" }}
    >
      <img
        src={game ? getGameImage(data, true) : getSoftwareImage(data)}
        className="card-img"
        alt={""}
      />
      <div className="card-body d-flex gap-2">
        <div className="flex-grow-1 text-white">
          <p style={{ fontSize: 14 }}>{data?.title || data?.GamesTitle}</p>
          <span style={{ background: "#ffffff15", padding: 5, fontSize: 12 }}>
            {data?.filesize || data?.GamesFileSize}
          </span>
        </div>
        <a
          href={data?.downLink || data?.DownloadLink}
          download="true"
          target="_blank"
          rel="noreferrer"
          className="btn btn-warning"
        >
          <i class="fas fa-arrow-alt-circle-down"></i>
        </a>
      </div>
    </figure>
  );
}
