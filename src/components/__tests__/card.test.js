import { render, screen } from "@testing-library/react";
import React from "react";
import Card from "../Card";

test("renders learn react link", () => {
  render(<Card key="1" />);
  const linkElement = screen.getByText("1");
  expect(linkElement).toBeInTheDocument();
});
