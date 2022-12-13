import * as React from "react";
import { createContext, useState } from "react";
import DeckOfCards from "../datamodels/DeckOfCards";

const SharedContext = createContext({
  activeCards1: [],
  addActiveCards1: () => {},
  removeActiveCards1: () => {},
  activeCards2: [],
  addActiveCards2: () => {},
  removeActiveCards2: () => {},
  cardStack1: [],
  addCardStack1: () => {},
  removeCardStack1: () => {},
  cardStack2: [],
  addCardStack2: () => {},
  removeCardStack2: () => {},
  isInWar: false,
  setIsInWar: () => {},
  isSelectEnabled1: true,
  setIsSelectEnabled1: () => {},
  isSelectEnabled2: true,
  setIsSelectEnabled2: () => {},
});

const SharedContextProvider = (props) => {
  let deckOfCards = new DeckOfCards();
  const playerCardStacks = deckOfCards.divideCards();

  const [activeCards1, setActiveCards1] = useState([]);
  const [activeCards2, setActiveCards2] = useState([]);
  const [cardStack1, setCardStack1] = useState(playerCardStacks[0]);
  const [cardStack2, setCardStack2] = useState(playerCardStacks[1]);
  const [isInWar, setIsInWar] = useState(false);
  const [isSelectEnabled1, setIsSelectEnabled1] = useState(true);
  const [isSelectEnabled2, setIsSelectEnabled2] = useState(true);

  React.useEffect(() => {}, [activeCards1]);

  return (
    <SharedContext.Provider
      value={{
        activeCards1: activeCards1,
        addActiveCards1: (cardsToAdd) =>
          setActiveCards1([...activeCards1, ...cardsToAdd]),
        removeActiveCards1: (cardsToRemove) => {
          const idsHashMap = new Set();
          cardsToRemove.forEach((cardToRemove) => {
            idsHashMap.add(cardToRemove.id);
          });
          setActiveCards1((current) =>
            current.filter((card) => !idsHashMap.has(card.id))
          );
        },
        activeCards2: activeCards2,
        addActiveCards2: (cardsToAdd) => {
          setActiveCards2([...activeCards2, ...cardsToAdd]);
        },
        removeActiveCards2: (cardsToRemove) => {
          const idsHashMap = new Set();
          cardsToRemove.forEach((cardToRemove) => {
            idsHashMap.add(cardToRemove.id);
          });
          setActiveCards2((current) =>
            current.filter((card) => !idsHashMap.has(card.id))
          );
        },
        cardStack1: cardStack1,
        addCardStack1: (cardsToAdd) => {
          setCardStack1([...cardStack1, ...cardsToAdd]);
        },
        removeCardStack1: (cardsToRemove) => {
          const idsHashMap = new Set();
          cardsToRemove.forEach((cardToRemove) => {
            idsHashMap.add(cardToRemove.id);
          });
          setCardStack1((current) =>
            current.filter((card) => !idsHashMap.has(card.id))
          );
        },
        cardStack2: cardStack2,
        addCardStack2: (cardsToAdd) => {
          setCardStack2([...cardStack2, ...cardsToAdd]);
        },
        removeCardStack2: (cardsToRemove) => {
          const idsHashMap = new Set();
          cardsToRemove.forEach((cardToRemove) => {
            idsHashMap.add(cardToRemove.id);
          });
          setCardStack2((current) =>
            current.filter((card) => !idsHashMap.has(card.id))
          );
        },
        isInWar: isInWar,
        setIsInWar: (flag) => setIsInWar(flag),
        isSelectEnabled1: isSelectEnabled1,
        setIsSelectEnabled1: (flag) => setIsSelectEnabled1(flag),
        isSelectEnabled2: isSelectEnabled2,
        setIsSelectEnabled2: (flag) => setIsSelectEnabled2(flag),
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export { SharedContext, SharedContextProvider };
