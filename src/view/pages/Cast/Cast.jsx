import React, { useEffect, useState } from "react";
import { H3, P } from "../../../style/typography/typography";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TMDBApi from "../../../Api/TMDB";
import { getTMDBimgPath, goToTop } from "../../../lib/tools";
import { Button } from "../../../style/common/Button";
import MovieDom from "../../../Api/MovieDom";
import Card from "../../components/common/Card";
import Image from "../../components/common/Image";
import { useTitle } from "react-haiku";
import { useSelector } from "react-redux";

function ActorsData({ cast }) {
  const [castData, setCastData] = useState({
    movies: [],
    tv_series: [],
  });

  useEffect(() => {
    if (cast?.name) {
      MovieDom.getItemsByCast("movie", cast?.name).then((dt) =>
        setCastData((state) => ({ ...state, movies: dt }))
      );
      MovieDom.getItemsByCast("tv", cast?.name).then((dt) =>
        setCastData((state) => ({ ...state, tv_series: dt }))
      );
    }
  }, [cast]);

  return (
    <section>
      <Container className="mt-4">
        <Tabs
          defaultActiveKey="movie"
          className="mb-3 border-0 actors-tabs-profile"
        >
          <Tab
            eventKey="movie"
            tabClassName="border-0 p-1 me-2 rounded-3"
            title={<Button className="py-2 px-3">Movie</Button>}
          >
            <Row xs={2} sm={3} md={4} lg={5} xl={6}>
              {castData?.movies?.map((item) => (
                <Col className="px-1" key={item.MovieID}>
                  {" "}
                  <Card data={item} />
                </Col>
              ))}
            </Row>
          </Tab>
          <Tab
            eventKey="tv_series"
            tabClassName="border-0 p-1 rounded-3"
            title={<Button className="py-2 px-3">TV Series</Button>}
          >
            <Row xs={2} sm={3} md={4} lg={5} xl={6}>
              {castData?.tv_series?.map((item) => (
                <Col className="px-1" key={item.TVID}>
                  {" "}
                  <Card backdrop data={item} />
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
}

export const CastIndex = () => {
  return (
    <Container>
      <H3>Actors ID Needed</H3>
    </Container>
  );
};

export const CastProfile = () => {
  const { id } = useParams();
  const {site}=useSelector(store=>store.site);
  const [cast, setCast] = useState({});
  useEffect(() => {
    TMDBApi.getCastSingle(id).then((dt) => setCast(dt));
  }, [id]);
  useEffect(() => {
    goToTop();
  }, []);

  useTitle(`${site?.name || MovieDom.appName}-${cast?.name || "Cast"}`);

  return (
    <section>
      <Container>
        <Row>
          {cast.profile_path && (
            <Col xs={12} md={3}>
              <Image
                poster
                src={getTMDBimgPath("w300", cast.profile_path)}
                alt=""
                className="w-100 rounded-3"
              />
            </Col>
          )}
          <Col xs={12} md={9}>
            <H3>{cast.name}</H3>
            <P className="mb-1">Bithday : {cast.birthday}</P>
            <P className="mb-1">Place Of Birth: {cast.place_of_birth}</P>
            <P className="mb-1" style={{ color: "#ffffffaa" }}>
              {cast.biography}
            </P>
          </Col>
        </Row>
      </Container>
      <ActorsData cast={cast} />
    </section>
  );
};

const CastPage = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default CastPage;
