import React from "react";
import PlayCard from "./PlayCard";

export default function ActiveCards(props) {
  const { activeCards } = props;
  if (activeCards.length > 0) {
    const cardComponentList = activeCards.map((activeCard) => (
      <PlayCard card={activeCard} />
    ));
    return <div>{cardComponentList}</div>;
  } else {
    return <div></div>;
  }
}
