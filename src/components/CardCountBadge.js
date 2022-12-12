import * as React from "react";
import Badge from "@mui/material/Badge";
import NumbersIcon from "@mui/icons-material/Numbers";

export default function CardCountBadge(props) {
  const { cardCount } = props;
  return (
    <Badge badgeContent={cardCount} color="primary">
      <NumbersIcon color="action" />
    </Badge>
  );
}
