import React from "react";
import { useTitle } from "react-haiku";
// import { useSelector } from "react-redux";

const SiteLoading = () => {
  // const { site } = useSelector((store) => store.site);
  useTitle("🕑 Loading...");
  return (
    <div className="center flex-column" style={{ height: "100vh" }}>
      {/* <img
        src={site?.logo || LOGO_PATH}
        alt={MovieDom.appName}
        style={{
          maxWidth: 150,
          width: "100%",
        }}
      /> */}
      <h3 className="text-white">🙋‍♂️ Loading...</h3>
    </div>
  );
};

export default SiteLoading;
