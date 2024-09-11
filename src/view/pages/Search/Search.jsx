import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Filter from "../../components/Filter/Filter";
import Card, { CardTypeTogglers } from "../../components/common/Card";
import { GoToTop } from "../Movies/Movies";
import { H4 } from "../../../style/typography/typography";
import { Devider } from "../../../style/common/Slider";
import MovieDom from "../../../Api/MovieDom";
import { goToTop } from "../../../lib/tools";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "react-haiku";
import { _HIT_ORIGIN } from "../../../constant";
import { useSelector } from "react-redux";
import { CARD_TYPES } from "../../../redux/slice/card-slice";
import { cover_variant, poster_variant } from "../TVSeries/TVSeries";

function FilterData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { card_type } = useSelector((s) => s.card);

  const query_obj = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );
  useEffect(() => {
    setLoading(true);
    MovieDom.getSearchItems({ ...query_obj, limit: 100 }, "tv")
      .then((dt) => {
        setData(dt);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [query_obj]);
  useLayoutEffect(() => {
    goToTop();
  }, []);

  function renderResult() {
    if (loading) {
      <div className="py-5 container center">
        <Spinner animation="border" variant="light" />
      </div>;
    }
    if (!loading && !data?.length) {
      return (
        <div className="center py-5">
          <img
            src={`${_HIT_ORIGIN}/failed.png`}
            alt=""
            style={{
              maxWidth: 300,
            }}
          />
        </div>
      );
    }
    return (
      <Row
        {...(card_type === CARD_TYPES.POSTER ? poster_variant : cover_variant)}
        className="mx-0"
      >
        {[...data].map((item, index) => (
          <Col key={item.MovieID || item.TVID || index} className="p-1">
            <Card data={item} all_page />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <H4 style={{ fontWeight: "500" }}>
          {query_obj.search ? `"${query_obj.search}" search result` : `Search`}
        </H4>
        <CardTypeTogglers />
      </div>
      <Devider className="mb-5" />
      {renderResult()}
    </>
  );
}

const Search = () => {
  const {site}=useSelector(store=>store.site);
  useTitle(`${site?.name || MovieDom.appName} - Search`);
  return (
    <Layout>
      <Container fluid className="px-3 py-4">
        <Row className="align-items-start">
          <Col xs={12} md={3}>
            <Filter type="search" />
          </Col>
          <Col xs={12} md={9}>
            <FilterData />
          </Col>
        </Row>
      </Container>
      <GoToTop />
    </Layout>
  );
};

export default Search;
