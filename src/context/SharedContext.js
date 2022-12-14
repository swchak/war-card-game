import * as React from "react";
import { createContext, useState } from "react";
import DeckOfCards from "../datamodels/DeckOfCards";

/**
 * Context object that holds information that can shared between components
 * Synchronizing actions between the 2 players turn
 */
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
  player1Won: false,
  setPlayer1Won: () => {},
  player2Won: false,
  setPlayer2Won: () => {},
});

/**
 * ContextProvider used to pass context info down to the child components
 * It ccntains shared state
 * @param {any} props
 * @returns
 */
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
  const [player1Won, setPlayer1Won] = useState(false);
  const [player2Won, setPlayer2Won] = useState(false);

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
        player1Won: player1Won,
        setPlayer1Won: (flag) => setPlayer1Won(flag),
        player2Won: player2Won,
        setPlayer2Won: (flag) => setPlayer2Won(flag),
      }}
    >
      {props.children}
    </SharedContext.Provider>
  );
};

export { SharedContext, SharedContextProvider };
