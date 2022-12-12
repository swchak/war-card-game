import React from "react";

function ImageComponent(props) {
  const { imgSrc, altText } = props;
  return <img src={imgSrc} alt={altText} />;
}

export default ImageComponent;
