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

export default function PlayerBoard1(props) {
  const {
    activeCards1,
    activeCards2,
    addActiveCards1,
    cardStack1,
    removeCardStack1,
    isInWar,
    isSelectEnabled1,
    setIsSelectEnabled1,
  } = React.useContext(SharedContext);

  //   const [isSelectCardEnabled, setIsSelectCardEnabled] = React.useState(true);

  React.useEffect(() => {
    if (!isInWar) {
      if (activeCards1.length > 0) {
        // card already selected, disable select button
        setIsSelectEnabled1(false);
      } else {
        // card not selected, enable select button
        setIsSelectEnabled1(true);
      }
    } else {
      // in war
      if (activeCards1.length > 0) {
        if (activeCards1.length > activeCards2.length) {
          // player 1 already made a selection but not player 2
          setIsSelectEnabled1(false);
        } else if (activeCards1.length < activeCards2.length) {
          //player 2 made the selection but not player 1
          setIsSelectEnabled1(true);
        } else {
          setIsSelectEnabled1(true);
        }
      }
      setIsSelectEnabled1(true);
    }
  }, [isInWar, activeCards1]);

  function pickCards(e) {
    if (!isInWar) {
      // pick 1 card, face card upwards and add it to active card list and remove it from players stack of cards
      if (cardStack1.length > 0) {
        const topCard = cardStack1[0];
        topCard.front = true;
        addActiveCards1([{ ...topCard }]);
        removeCardStack1([{ ...topCard }]);
      } else {
        // player ran out of cards convey to parent component that player lost
      }
    } else {
      // pick 4 cards, add them to active card list with last card turned front side and remove it from players stack of cards
      if (cardStack1.length < 4) {
        // player is out of cards announce player as lost
      } else {
        // pick 4 cards from top of stack with last card front facing
        const newCards = cardStack1.slice(0, 4);
        newCards[3].front = true;
        addActiveCards1([...newCards]);
        removeCardStack1([...newCards]);
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
                <CardCountBadge cardCount={cardStack1.length}></CardCountBadge>
              </Item>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={!isSelectEnabled1}
                onClick={pickCards}
              >
                {isInWar ? "Select 4 Cards" : "Select a Card"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActiveCards activeCards={activeCards1} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
