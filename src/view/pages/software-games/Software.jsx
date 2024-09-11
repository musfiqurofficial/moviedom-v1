import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import MovieDom from "../../../Api/MovieDom";
import { _HIT_ORIGIN } from "../../../constant";
import { CardWrapper } from "./AppCard";

const STATUS = {
  INIT: "INIT",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export default function Software() {
  const [datas, setDatas] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS.INIT);

  React.useEffect(() => {
    setStatus(STATUS.PENDING);
    (async function () {
      try {
        const data = await MovieDom.getSoftware();
        setDatas(data);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        setDatas([]);
        setStatus(STATUS.FAILED);
      }
    })();
  }, []);

  if (status === (STATUS.INIT || STATUS.PENDING)) {
    return (
      <div style={{ height: "100vh" }} className="center">
        <Spinner animation="border" variant="white" size="lg" />;
      </div>
    );
  }
  return (
    <main>
      <section id="header">
        <img src={`${_HIT_ORIGIN}/software-banner.svg`} alt="" className="w-100" />
      </section>
      {status === STATUS.FAILED ? (
        <div className="px-2 px-md-3 px-lg-5  py-2 container-fluid">
          <Alert variant="danger">Failed to get Software.</Alert>
        </div>
      ) : (
        <CardWrapper datas={datas} software />
      )}
    </main>
  );
}
