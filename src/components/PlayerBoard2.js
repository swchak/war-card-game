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

export default function PlayerBoard2(props) {
  const {
    activeCards2,
    activeCards1,
    addActiveCards2,
    cardStack2,
    removeCardStack2,
    isInWar,
    isSelectEnabled2,
    setIsSelectEnabled2,
  } = React.useContext(SharedContext);

  React.useEffect(() => {
    if (isInWar) {
      if (
        activeCards1.length === activeCards2.length &&
        activeCards1.length > 0
      ) {
        // check the top cards to determine if select button has to be enabled or not
        const topCard1 = activeCards1[activeCards1.length - 1];
        const topCard2 = activeCards2[activeCards2.length - 1];
        setIsSelectEnabled2(topCard1.value === topCard2.value);
      } else {
        setIsSelectEnabled2(activeCards2.length < activeCards1.length);
      }
    } else {
      // not in war
      setIsSelectEnabled2(activeCards2.length !== 1);
    }
  }, [isInWar, activeCards2]);

  function pickCards(e) {
    if (!isInWar) {
      // pick 1 card, face card upwards and add it to active card list and remove it from players stack of cards
      if (cardStack2.length > 0) {
        const topCard = cardStack2[0];
        topCard.front = true;
        addActiveCards2([{ ...topCard }]);
        removeCardStack2([{ ...topCard }]);
      } else {
        // player ran out of cards convey to parent component that player lost
      }
    } else {
      // pick 4 cards, add them to active card list with last card turned front side and remove it from players stack of cards
      if (cardStack2.length < 4) {
        // player is out of cards announce player as lost
      } else {
        // pick 4 cards from top of stack with last card front facing
        const newCards = cardStack2.slice(0, 4);
        newCards[3].front = true;
        addActiveCards2([...newCards]);
        removeCardStack2([...newCards]);
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
                <CardCountBadge cardCount={cardStack2.length}></CardCountBadge>
              </Item>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={!isSelectEnabled2}
                onClick={pickCards}
              >
                {isInWar ? "Select 4 Cards" : "Select a Card"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActiveCards activeCards={activeCards2} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
