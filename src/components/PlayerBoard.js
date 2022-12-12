import React from "react";
import ActiveCards from "./ActiveCards";
import ImageComponent from "./ImageComponent";
import { Grid, Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import cardDeckImage from "../images/CardsDeck200x200.png";
import CardCountBadge from "./CardCountBadge";

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
    onChangeReadyToCompare,
    onPlayerLost,
    readyToCompareProp,
  } = props;

  const [activeCards, setActiveCards] = React.useState(activeCardsProp);
  const [isSelectCardEnabled, setIsSelectCardEnabled] = React.useState(true);
  const [playerCardStack, setPlayerCardStack] = React.useState(cardStack);
  const [cardsSelected, setCardsSelected] = React.useState([]);
  const [readyToCompare, setReadyToCompare] =
    React.useState(readyToCompareProp);

  React.useEffect(() => {
    // add cards selected to active cards list
    if (cardsSelected.length > 0) {
      setActiveCards((activeCards) => [...activeCards, ...cardsSelected]);
      const idsHashSet = new Set();
      cardsSelected.forEach((card) => idsHashSet.add(card.id));
      setPlayerCardStack((current) =>
        current.filter((card) => !idsHashSet.has(card.id))
      );
    }
  }, [cardsSelected]);

  React.useEffect(() => {
    if (cardsSelected.length > 0) {
      onSelectCards({ player, selectCards: [...cardsSelected] });
      setReadyToCompare(true);
    }
  }, [activeCards, playerCardStack]);

  React.useEffect(() => {
    onChangeReadyToCompare({ player, readyToCompare });
    setIsSelectCardEnabled(!readyToCompare);
    setCardsSelected([]);
  }, [readyToCompare]);

  React.useEffect(() => {
    if (!isInWar) {
      if (activeCards.length > 0) {
        setIsSelectCardEnabled(false);
      } else {
        setIsSelectCardEnabled(true);
      }
    } else {
      setIsSelectCardEnabled(true);
    }
  }, [isInWar]);

  function pickCards(e) {
    if (playerCardStack.length === 0) {
      onPlayerLost({ player });
    }
    if (!isInWar) {
      // pick 1 card, face card upwards and add it to active card list and remove it from players stack of cards
      if (playerCardStack.length > 0) {
        const topCard = playerCardStack[0];
        topCard.front = true;
        setCardsSelected((cardsSelected) => [...cardsSelected, { ...topCard }]);
      } else {
        // player ran out of cards convey to parent component that player lost
        onPlayerLost({ player, lost: true });
      }
    } else {
      // pick 4 cards, add them to active card list with last card turned front side and remove it from players stack of cards
      const newCards = playerCardStack.slice(0, 4);
      newCards[3].front = true;
      setCardsSelected((cardsSelected) => [...cardsSelected, ...newCards]);
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
