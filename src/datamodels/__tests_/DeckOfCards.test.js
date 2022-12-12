import CardHashMap from "../../utils/utils";
import DeckOfCards from "../DeckOfCards";

describe("Test class DeckOfCards", () => {
  it("getDeckOfCards returns deck of cards", () => {
    let deckOfCards = new DeckOfCards();
    let cards = deckOfCards.getDeckOfCards();
    expect(cards.length).toBe(52);
    Object.keys(CardHashMap).forEach((key) => {
      expect(cards.filter((card) => card.key == key).length).toBe(4);
    });
  });

  it("divideCards returns ", () => {
    let deckOfCards = new DeckOfCards();
    let setsOfCards = deckOfCards.divideCards();
    expect(setsOfCards.length).toBe(2);
    expect(setsOfCards[0].length).toBe(26);
    expect(setsOfCards[1].length).toBe(26);
  });
});
