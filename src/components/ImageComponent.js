import React from "react";

/**
 * Wrapper react component over an image html tag tp display an image
 * @param { any } props 
 * @returns 
 */
function ImageComponent(props) {
  const { imgSrc, altText } = props;
  return <img src={imgSrc} alt={altText} />;
}

export default ImageComponent;