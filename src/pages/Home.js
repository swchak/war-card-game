import * as React from "react";
import { Box, Grid, Paper, Alert, Button } from "@mui/material";
import PlayerBoard from "../components/PlayerBoard";
import { styled } from "@mui/material/styles";
import { SharedContext } from "../context/SharedContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const {
    activeCards1,
    removeActiveCards1,
    activeCards2,
    removeActiveCards2,
    addCardStack1,
    addCardStack2,
    isInWar,
    isSelectEnabled1,
    isSelectEnabled2,
    setIsInWar,
    player1Won,
    player2Won,
  } = React.useContext(SharedContext);

  const [compareEnabled, setCompareEnabled] = React.useState(false);

  React.useEffect(() => {
    if (!isSelectEnabled1 && !isSelectEnabled2) {
      setCompareEnabled(true);
    } else {
      setCompareEnabled(false);
    }
  }, [isSelectEnabled1, isSelectEnabled2]);

  const compareCards = () => {
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
        addCardStack1(newCardsToAdd);
      } else {
        addCardStack2(newCardsToAdd);
      }
      // clear the active cards
      removeActiveCards1(newCardsToAdd);
      removeActiveCards2(newCardsToAdd);
      setIsInWar(false);
      setCompareEnabled(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        <Grid item xs={10}>
          <Item>
            <h1>{"Player 1"}</h1>
            <PlayerBoard player="1" />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Button
              variant="contained"
              disabled={!compareEnabled}
              onClick={compareCards}
            >
              {"Compare"}
            </Button>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item>
            <h1>{"Player 2"}</h1>
            <PlayerBoard player="2" />
          </Item>
        </Grid>
      </Grid>
      {isInWar && (
        <Grid container spacing={2} columns={24}>
          <Grid item xs={24}>
            <Item>
              <Alert severity="info">{"War mode is on"}</Alert>
            </Item>
          </Grid>
        </Grid>
      )}
      {player1Won && (
        <Grid container spacing={2} columns={24}>
          <Grid item xs={24}>
            <Item>
              <Alert severity="success">{"Player1 won the game"}</Alert>
            </Item>
          </Grid>
        </Grid>
      )}
      {player2Won && (
        <Grid container spacing={2} columns={24}>
          <Grid item xs={24}>
            <Item>
              <Alert severity="success">{"Player2 won the game"}</Alert>
            </Item>
          </Grid>
        </Grid>
      )}
      {isInWar && (
        <Grid container spacing={2} columns={24}>
          <Grid item xs={24}>
            <Item>
              <Alert severity="info">{"War mode is on"}</Alert>
            </Item>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
