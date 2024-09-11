import React, {
  useCallback, useEffect,
  useLayoutEffect,
  useMemo, useState
} from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useTitle } from "react-haiku";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MovieDom from "../../../Api/MovieDom";
import { goToTop } from "../../../lib/tools";
import { CARD_TYPES } from "../../../redux/slice/card-slice";
import { Devider } from "../../../style/common/Slider";
import { H4, P } from "../../../style/typography/typography";
import Filter from "../../components/Filter/Filter";
import Layout from "../../components/Layout/Layout";
import Card, { CardTypeTogglers } from "../../components/common/Card";
import { GoToTop } from "../Movies/Movies";


export const cover_variant = {
  xs: 2,
  md: 3,
  lg: 4,
  xl: 5,
};
export const poster_variant = {
  xs: 3,
  md: 5,
  lg: 6,
};

function FilterData() {
  const {site}=useSelector(store=>store.site);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const { card_type } = useSelector((s) => s.card);

  const query_obj = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );

  const loadNextPage = useCallback(() => {
    MovieDom.getSortedItems({ ...query_obj, page: page, limit: 30 }, "tv").then(
      (dt) => {
        if (dt.length) {
          setData((preData) => [...preData, ...dt]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    );
    setPage((state) => state + 1);
  }, [page, query_obj]);

  // function loadNextPageData() {
  //   MovieDom.getSortedItems({ ...tv_series_filter, page: page, limit: 30 }, "tv").then((dt) => {
  //     if (dt.length) {
  //       setData((preData) => [...preData, ...dt]);
  //       setHasMore(true);
  //     } else {
  //       setHasMore(false);
  //     }
  //   });
  //   setPage((state) => state + 1);
  // }

  useEffect(() => {
    setPage(2);
    setHasMore(true)
    MovieDom.getSortedItems({ ...query_obj, page: 1, limit: 30 }, "tv").then(
      (dt) => {
        setData(dt);
      }
    );
  }, [query_obj]);
  useTitle(`${site?.name || MovieDom?.appName} - TV Series`);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between  pt-3 pb-1 pt-md-4 pb-md-3">
        <div className="d-flex align-items-center gap-3">
          <H4 style={{ fontWeight: "500" }} className="me-2">
            TV Series
          </H4>
          {query_obj.category && (
            <P as="small" className="mb-0" color="text">
              Category : {query_obj.category}
            </P>
          )}
        </div>
        <div>
          <CardTypeTogglers />
        </div>
      </div>
      <Devider className="mb-5" />

      <InfiniteScroll
        dataLength={30*(page+3)}
        next={() => loadNextPage()}
        hasMore={hasMore}
        loader={
          <div className="my-5 center">
            <Spinner animation="border" variant="light" />
          </div>
        }
        className="px-0"
      >
        <Row
          {...(card_type === CARD_TYPES.POSTER
            ? poster_variant
            : cover_variant)}
          className="mx-0"
        >
          {[...new Set(data)].map((item, index) => (
            <Col key={item.MovieID} className="p-1">
              <Card backdrop all_page data={item} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </>
  );
}

const TVSeries = () => {
  useLayoutEffect(() => {
    goToTop();
  }, []);
  return (
    <Layout>
      <Container fluid className="px-2 px-md-3 px-lg-5  my-3 my-md-4">
        <Row className="align-items-start">
          <Col xs={12} md={3}>
            <Filter type="tv-series" />
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

export default TVSeries;
