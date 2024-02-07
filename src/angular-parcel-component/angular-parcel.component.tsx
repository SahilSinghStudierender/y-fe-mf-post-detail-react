import React, { useState, useEffect } from "react";
import Parcel from "single-spa-react/parcel";

const AngularParcelComponent = ({ postId }) => {
  const [parcelConfig, setParcelConfig] = useState(null);

  useEffect(() => {
    System.import("@Y/parcel-comments")
      .then(setParcelConfig)
      .catch((err) => console.error("Failed to load Angular parcel:", err));
  }, []);

  if (!parcelConfig) {
    return <></>;
  }

  return (
    <>
      <Parcel config={parcelConfig} postId={postId} />
    </>
  );
};

export default AngularParcelComponent;
