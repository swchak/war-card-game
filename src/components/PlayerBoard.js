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

/**
 * Generic React component to display boards of player 1 or player 2
 * @param {any} props 
 * @returns 
 */
export default function PlayerBoard(props) {
  const { player } = props;
  const {
    activeCards1,
    activeCards2,
    addActiveCards1,
    addActiveCards2,
    cardStack1,
    cardStack2,
    removeCardStack1,
    removeCardStack2,
    isInWar,
    isSelectEnabled1,
    setIsSelectEnabled1,
    isSelectEnabled2,
    setIsSelectEnabled2,
    setPlayer1Won,
    setPlayer2Won,
  } = React.useContext(SharedContext);

  React.useEffect(() => {
    if (player === "1") {
      updateSelectEnabled(activeCards1, activeCards2, setIsSelectEnabled1);
    } else {
      updateSelectEnabled(activeCards2, activeCards1, setIsSelectEnabled2);
    }
  }, [isInWar, activeCards1, activeCards2]);

  function updateSelectEnabled(
    activeCards,
    otherActiveCards,
    setIsSelectEnabled
  ) {
    if (isInWar) {
      if (
        activeCards.length === otherActiveCards.length &&
        activeCards.length > 0
      ) {
        // check the top cards to determine if select button has to be enabled or not
        const topCard1 = activeCards[activeCards.length - 1];
        const topCard2 = otherActiveCards[otherActiveCards.length - 1];
        setIsSelectEnabled(topCard1.value === topCard2.value);
      } else {
        setIsSelectEnabled(activeCards.length < otherActiveCards.length);
      }
    } else {
      // not in war
      setIsSelectEnabled(activeCards.length !== 1);
    }
  }

  function pickCardsHelper(
    cardStack,
    addActiveCards,
    removeCardStack,
    setPlayerWon
  ) {
    if (!isInWar) {
      // pick 1 card, face card upwards and add it to active card list and remove it from players stack of cards
      if (cardStack.length > 0) {
        const topCard = cardStack[0];
        topCard.front = true;
        addActiveCards([{ ...topCard }]);
        removeCardStack([{ ...topCard }]);
      } else {
        // player ran out of cards convey to parent component that player lost
        setPlayerWon(true);
      }
    } else {
      // pick 4 cards, add them to active card list with last card turned front side and remove it from players stack of cards
      if (cardStack.length < 4) {
        // player is out of cards announce player as lost
        setPlayerWon(true);
      } else {
        // pick 4 cards from top of stack with last card front facing
        const newCards = cardStack.slice(0, 4);
        newCards[3].front = true;
        addActiveCards([...newCards]);
        removeCardStack([...newCards]);
      }
    }
  }

  function pickCards(e) {
    if (player === "1") {
      pickCardsHelper(
        cardStack1,
        addActiveCards1,
        removeCardStack1,
        setPlayer2Won
      );
    } else {
      pickCardsHelper(
        cardStack2,
        addActiveCards2,
        removeCardStack2,
        setPlayer1Won
      );
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
                  cardCount={
                    player === "1" ? cardStack1.length : cardStack2.length
                  }
                ></CardCountBadge>
              </Item>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={
                  player === "1" ? !isSelectEnabled1 : !isSelectEnabled2
                }
                onClick={pickCards}
              >
                {isInWar ? "Select 4 Cards" : "Select a Card"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActiveCards
              activeCards={player === "1" ? activeCards1 : activeCards2}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
