import * as React from "react";
import Badge from "@mui/material/Badge";
import NumbersIcon from "@mui/icons-material/Numbers";

/**
 * Component to display counts of stack of cards held by a player
 */
export default function CardCountBadge(props) {
  const { cardCount } = props;
  return (
    <Badge badgeContent={cardCount} color="primary">
      <NumbersIcon color="action" />
    </Badge>
  );
}
