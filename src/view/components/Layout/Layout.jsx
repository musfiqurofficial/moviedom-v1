import React from "react";
import Footer from "./Footer";

const Layout = ({ children, style, ...rest }) => {
  return (
    <main
      {...rest}
      className="position-relative"
      style={{
        ...style,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <div style={{ minHeight: "80vh" }}>{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
