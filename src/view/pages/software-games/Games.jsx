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

export default function Games() {
  const [datas, setDatas] = React.useState([]);
  const [status, setStatus] = React.useState(STATUS.INIT);

  React.useEffect(() => {
    setStatus(STATUS.PENDING);
    (async function () {
      try {
        const data = await MovieDom.getGames();
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
        <img src={`${_HIT_ORIGIN}/game-banner.svg`} alt="" className="w-100" />
      </section>
      {status === STATUS.FAILED || datas?.length === 0 ? (
        <div className="px-2 px-md-3 px-lg-5  py-2 container-fluid">
          <Alert variant="danger">Failed to get Game.</Alert>
        </div>
      ) : (
        <CardWrapper datas={datas} game />
      )}
    </main>
  );
}
