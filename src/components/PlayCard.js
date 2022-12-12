import React from "react";
import backImg from "../images/back.svg";
import imageMap from "../utils/imageMap";

function PlayCard(props) {
  const { card, style = {}, className = "" } = props;
  const { suit, rank, front } = card;
  const imgSrc = imageMap[rank + suit];


  if (front) {
    return (
      <img
        src={imgSrc}
        className={`react-playing-card react-playing-card__back ${className}`}
        alt={imgSrc}
        style={style}
        height={100}
      />
    );
  } else {
    return (
      <img
        src={backImg}
        className={`react-playing-card react-playing-card__back ${className}`}
        alt="card-back"
        style={style}
      />
    );
  }
}

export default PlayCard;
