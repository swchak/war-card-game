import * as React from "react";
import { Box, Grid, Paper, Alert } from "@mui/material";
import PlayerBoard from "../components/PlayerBoard";
import { styled } from "@mui/material/styles";
import DeckOfCards from "../datamodels/DeckOfCards";

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
  const [readyToCompare1, setReadyToCompare1] = React.useState(false);
  const [readyToCompare2, setReadyToCompare2] = React.useState(false);
  const [activeCards1, setActiveCards1] = React.useState([]);
  const [activeCards2, setActiveCards2] = React.useState([]);
  const [player1Lost, setPlayer1Lost] = React.useState(false);
  const [player2Lost, setPlayer2Lost] = React.useState(false);

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

  const handleReadyToCompare = ({ player, readyToCompare: ready }) => {
    if (player === "1") {
      setReadyToCompare1(ready);
    } else {
      setReadyToCompare2(ready);
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

  React.useEffect(() => {
    if (cardStack1.length === 0 || cardStack2.length === 0) {
      // game ends, declare winner as one who has 52 card
    }
  }, [cardStack1, cardStack2]);

  React.useEffect(() => {
    if (readyToCompare1 && readyToCompare2) {
      const topCard1 = activeCards1[activeCards1.length - 1];
      const topCard2 = activeCards2[activeCards2.length - 1];
      if (topCard1.value === topCard2.value) {
        setIsInWar(true);
      } else {
        const tempArray1 = [...activeCards1];
        tempArray1.forEach((card) => {
          card.front = false;
        });

        const tempArray2 = [...activeCards2];
        tempArray2.forEach((card) => {
          card.front = false;
        });
        const newCardsToAdd = [...tempArray1, ...tempArray2];
        const idsHashSet = new Set();
        const idsList = newCardsToAdd.map((card) => card.id);
        idsList.forEach((cardId) => idsHashSet.add(cardId));

        if (topCard1.value > topCard2.value) {
          setCardStack1((cardStack) => [...cardStack, ...newCardsToAdd]);
        } else {
          setCardStack2((cardStack) => [...cardStack, ...newCardsToAdd]);
        }

        // clear active cards after they are added to the player stack of cards
        setActiveCards1((current) =>
          current.filter((card) => !idsHashSet.has(card.id))
        );
        console.log(activeCards1);
        setActiveCards2((current) =>
          current.filter((card) => !idsHashSet.has(card.id))
        );
        console.log(activeCards2);
        setReadyToCompare1(false);
        setReadyToCompare2(false);
      }
    }
  }, [readyToCompare1, readyToCompare2, activeCards1, activeCards2]);

  return (
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
              onChangeReadyToCompare={handleReadyToCompare}
              onPlayerLost={handlePlayerLost}
              readyToCompareProp={readyToCompare1}
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
              onChangeReadyToCompare={handleReadyToCompare}
              onPlayerLost={handlePlayerLost}
              readyToCompareProp={readyToCompare2}
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
  );
}
