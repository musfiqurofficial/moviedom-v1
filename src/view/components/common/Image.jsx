import React, { useEffect, useState } from "react";
import { _HIT_ORIGIN } from "../../../constant";

const Image = ({ src, poster, alt, onError = () => {}, ...rest }) => {
  const [img_path, setImgPath] = useState(null);
  useEffect(() => {
    setImgPath(src);
  }, [src]);
  return (
    <img
      src={img_path}
      onError={() => {
        onError();
        setImgPath(
          poster
            ? `${_HIT_ORIGIN}/no-poster.jpg`
            : `${_HIT_ORIGIN}/no-backdrop.jpg`
        );
      }}
      alt={alt}
      {...rest}
    />
  );
};

export default Image;
