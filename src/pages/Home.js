import * as React from "react";
import { Box, Grid, Paper, Alert } from "@mui/material";
import PlayerBoard from "../components/PlayerBoard";
import { styled } from "@mui/material/styles";
import DeckOfCards from "../datamodels/DeckOfCards";
import { SharedContextProvider } from "../context/SharedContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  let deckOfCards = new DeckOfCards();
  const playerCardStacks = deckOfCards.divideCards();

  const [cardStack1, setCardStack1] = React.useState(playerCardStacks[0]);
  const [cardStack2, setCardStack2] = React.useState(playerCardStacks[1]);
  const [isInWar, setIsInWar] = React.useState(false);
  const [activeCards1, setActiveCards1] = React.useState([]);
  const [activeCards2, setActiveCards2] = React.useState([]);
  const [player1Lost, setPlayer1Lost] = React.useState(false);
  const [player2Lost, setPlayer2Lost] = React.useState(false);
  /**
   * updates to active cards and player card stack state isnt getting passed to child components
   * after comparing hence adding this workaround where I pass the cards that need to added to the bottom of the stack
   *  */
  const [collectCards1, setCollectCards1] = React.useState([]);
  const [collectCards2, setCollectCards2] = React.useState([]);
  // const [clearActiveCards, setClearActiveCards] = React.useState(false);

  // const handleClearActiveCards = ({ toClear }) => {
  //   // setClearActiveCards(toClear);
  //   setCollectCards1([]);
  //   setCollectCards2([]);
  // };

  const handleSelectCards = ({ player, selectCards }) => {
    const idsHashSet = new Set();
    selectCards.forEach((card) => idsHashSet.add(card.id));

    if (player === "1") {
      setActiveCards1((activeCards) => [...activeCards, ...selectCards]);
      setCardStack1((current) =>
        current.filter((card) => !idsHashSet.has(card.id))
      );
    } else {
      setActiveCards2((activeCards) => [...activeCards, ...selectCards]);
      setCardStack2((current) =>
        current.filter((card) => !idsHashSet.has(card.id))
      );
    }
  };

  const handlePlayerLost = ({ player }) => {
    if (player === "1") {
      setPlayer1Lost(true);
    } else {
      setPlayer2Lost(true);
    }
  };

  React.useEffect(() => {
    if ((player1Lost && !player2Lost) || (player2Lost && !player1Lost)) {
      // game ends, declare winner as player who did not loose
    }
  }, [player1Lost, player2Lost]);

  // React.useEffect(() => {
  //   if (cardStack1.length === 0 || cardStack2.length === 0) {
  //     // game ends, declare winner as one who has 52 card
  //   }
  // }, [cardStack1, cardStack2]);

  React.useEffect(() => {
    if (
      activeCards1.length === activeCards2.length &&
      activeCards1.length > 0
    ) {
      const topCard1 = activeCards1[activeCards1.length - 1];
      const topCard2 = activeCards2[activeCards2.length - 1];
      if (topCard1.value === topCard2.value) {
        setIsInWar(true);
      } else {
        /**
         * Create an array newCardsToAdd containing copies of both sets of active
         * cards in face down position
         **/
        const tempArray1 = [...activeCards1];
        tempArray1.forEach((card) => {
          card.front = false;
        });

        const tempArray2 = [...activeCards2];
        tempArray2.forEach((card) => {
          card.front = false;
        });
        const newCardsToAdd = [...tempArray1, ...tempArray2];

        /**
         * Add the new cards to the player stack of cards player whose last active card has higher value
         */
        if (topCard1.value > topCard2.value) {
          setCollectCards1((current) => [
            ...collectCards1,
            ...tempArray1,
            ...tempArray2,
          ]);
          setCardStack1((cardStack) => [...cardStack, ...newCardsToAdd]);
        } else {
          setCollectCards2((current) => [
            ...collectCards2,
            ...tempArray1,
            ...tempArray2,
          ]);
          setCardStack2((cardStack) => [...cardStack, ...newCardsToAdd]);
        }

        console.log(newCardsToAdd);

        // clear active cards list after they are added to the player stack of cards
        const idsHashSet = new Set();
        const idsList = newCardsToAdd.map((card) => card.id);
        idsList.forEach((cardId) => idsHashSet.add(cardId));
        setActiveCards1((current) =>
          current.filter((card) => !idsHashSet.has(card.id))
        );
        setActiveCards2((current) =>
          current.filter((card) => !idsHashSet.has(card.id))
        );
      }
    }
  }, [activeCards1, activeCards2]);

  // React.useEffect(() => {
  //   setClearActiveCards(true);
  // }, [collectCards1, collectCards2]);

  return (
    <SharedContextProvider>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Item>
              <PlayerBoard
                player="1"
                cardStack={cardStack1}
                isInWar={isInWar}
                activeCardsProp={activeCards1}
                onSelectCards={handleSelectCards}
                // onChangeReadyToCompare={handleReadyToCompare}
                onPlayerLost={handlePlayerLost}
                // readyToCompareProp={readyToCompare1}
                otherActiveCardsProp={activeCards2}
                collectCardsProp={collectCards1}
                // onClearActiveCards={handleClearActiveCards}
                // clearActiveCards={clearActiveCards}
              />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <PlayerBoard
                player="2"
                cardStack={cardStack2}
                isInWar={isInWar}
                activeCardsProp={activeCards2}
                onSelectCards={handleSelectCards}
                // onChangeReadyToCompare={handleReadyToCompare}
                onPlayerLost={handlePlayerLost}
                // readyToCompareProp={readyToCompare2}
                otherActiveCardsProp={activeCards1}
                collectCardsProp={collectCards2}
                // onClearActiveCards={handleClearActiveCards}
                // clearActiveCards={clearActiveCards}
              />
            </Item>
          </Grid>
        </Grid>
        {isInWar && (
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16}>
              <Item>
                <Alert severity="info">{"War mode is on"}</Alert>
              </Item>
            </Grid>
          </Grid>
        )}
      </Box>
    </SharedContextProvider>
  );
}
