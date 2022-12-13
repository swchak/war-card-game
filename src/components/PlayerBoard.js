import React from "react";
import ActiveCards from "./ActiveCards";
import ImageComponent from "./ImageComponent";
import { Grid, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import cardDeckImage from "../images/CardsDeck200x200.png";
import CardCountBadge from "./CardCountBadge";
import { SharedContext } from "../context/SharedContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PlayerBoard(props) {
  const {
    player,
    cardStack,
    isInWar,
    activeCardsProp,
    onSelectCards,
    // onChangeReadyToCompare,
    onPlayerLost,
    // readyToCompareProp,
    otherActiveCardCount,
    collectCardsProp,
    // onClearActiveCards,
    // clearActiveCards,
  } = props;

  const [activeCards, setActiveCards] = React.useState(activeCardsProp);
  const [isSelectCardEnabled, setIsSelectCardEnabled] = React.useState(true);
  const [playerCardStack, setPlayerCardStack] = React.useState(cardStack);
  const {
    clearActiveCards1,
    setClearActiveCards1,
    clearActiveCards2,
    setClearActiveCards2,
  } = React.useContext(SharedContext);

  React.useEffect(() => {
    if (collectCardsProp.length > 0) {
      const idsHashSet = new Set();
      collectCardsProp.forEach((card) => idsHashSet.add(card.id));
      setPlayerCardStack((cardStack) => [...cardStack, ...collectCardsProp]);
      setActiveCards((current) =>
        current.filter((card) => !idsHashSet.has(card.id))
      );
      if (player === "1") {
        setClearActiveCards2(true);
      } else {
        setClearActiveCards1(true);
      }

      // onClearActiveCards({ toClear: true });
    }
  }, [collectCardsProp]);

  React.useEffect(() => {
    if (activeCards.length > 0) {
      const idsHashSet = new Set();
      activeCards.forEach((card) => idsHashSet.add(card.id));
      setActiveCards((current) =>
        current.filter((card) => !idsHashSet.has(card.id))
      );
    }
  }, [clearActiveCards1, clearActiveCards2]);
  // const [cardsSelected, setCardsSelected] = React.useState([]);
  // const [readyToCompare, setReadyToCompare] =
  // React.useState(readyToCompareProp);

  // React.useEffect(() => {
  //   // add cards selected to active cards list
  //   if (cardsSelected.length > 0) {
  //     setActiveCards((activeCards) => [...activeCards, ...cardsSelected]);
  //     const idsHashSet = new Set();
  //     cardsSelected.forEach((card) => idsHashSet.add(card.id));
  //     setPlayerCardStack((current) =>
  //       current.filter((card) => !idsHashSet.has(card.id))
  //     );
  //   }
  // }, [cardsSelected]);

  // React.useEffect(() => {
  //   if (cardsSelected.length > 0) {
  //     onSelectCards({ player, selectCards: [...cardsSelected] });
  //     // setReadyToCompare(true);
  //   }
  // }, [activeCards, playerCardStack]);

  React.useEffect(() => {
    onSelectCards({ player, selectCards: [...activeCards] });
    if (!isInWar) {
      if (activeCards.length > 0) {
        setIsSelectCardEnabled(false);
      } else {
        setIsSelectCardEnabled(true);
      }
    } else {
      // in war mode # activeCards is atleast 1
      if (activeCards.length > otherActiveCardCount) {
        // cards already selected for the turn
        setIsSelectCardEnabled(false);
      } else {
        setIsSelectCardEnabled(true);
      }
    }
    // if (activeCards.length > 0) {
    //       onSelectCards({ player, selectCards: [...activeCards] });
    //     } else {
    //        setIsSelectCardEnabled(true);
    //     }
  }, [activeCards, isInWar]);

  // React.useEffect(() => {
  //   onChangeReadyToCompare({ player, readyToCompare });
  //   setIsSelectCardEnabled(!readyToCompare);
  //   setCardsSelected([]);
  // }, [readyToCompare]);

  // React.useEffect(() => {
  //   if (!isInWar) {
  //     if (activeCards.length > 0) {
  //       // card already selected, disable select button
  //       setIsSelectCardEnabled(false);
  //     } else {
  //       // card not selected, enable select button
  //       setIsSelectCardEnabled(true);
  //     }
  //   } else {
  //     if (activeCards.length > 0) {
  //       // cards already selected in the active window
  //     }
  //     setIsSelectCardEnabled(true);
  //   }
  // }, [isInWar]);

  function pickCards(e) {
    if (!isInWar) {
      // pick 1 card, face card upwards and add it to active card list and remove it from players stack of cards
      if (playerCardStack.length > 0) {
        const topCard = playerCardStack[0];
        topCard.front = true;
        // setCardsSelected((cardsSelected) => [...cardsSelected, { ...topCard }]);
        setActiveCards((activeCards) => [...activeCards, { ...topCard }]);
        setPlayerCardStack((current) =>
          current.filter((card) => card.id !== topCard.id)
        );
        onSelectCards({ player, selectCards: [...activeCards] });
      } else {
        // player ran out of cards convey to parent component that player lost
        onPlayerLost({ player });
      }
    } else {
      // pick 4 cards, add them to active card list with last card turned front side and remove it from players stack of cards
      if (playerCardStack.length < 4) {
        // player is out of cards announce player as lost
        onPlayerLost({ player });
      } else {
        // pick 4 cards from top of stack with last card front facing
        const newCards = playerCardStack.slice(0, 4);
        newCards[3].front = true;
        setActiveCards((activeCards) => [...activeCards, ...newCards]);
        const idsHashSet = new Set();
        newCards.forEach((card) => idsHashSet.add(card.id));
        setPlayerCardStack((current) =>
          current.filter((card) => !idsHashSet.has(card.id))
        );
        onSelectCards({ player, selectCards: [...activeCards] });
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} rows={16}>
        <Grid item xs={8}>
          <Grid container direction="column">
            <Grid item>
              <Item>
                <ImageComponent
                  imgSrc={cardDeckImage}
                  altText="Deck of Cards"
                />
              </Item>
              <Item>
                <CardCountBadge
                  cardCount={playerCardStack.length}
                ></CardCountBadge>
              </Item>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={!isSelectCardEnabled}
                onClick={pickCards}
              >
                {isInWar ? "Select 4 Cards" : "Select a Card"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActiveCards activeCards={activeCards} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
