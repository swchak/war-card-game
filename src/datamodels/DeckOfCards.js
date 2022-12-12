import PlayCard from "../datamodels/PlayCard";
import { cardValueMap, rankMap, suitMap } from "../utils/utils";

export default class DeckOfCards {
  constructor() {
    this.packOfCards = [];
    let id = -1;
    Object.keys(rankMap).forEach((rank) => {
      Object.keys(suitMap).forEach((suit) => {
        this.packOfCards.push(
          new PlayCard(++id, rank, cardValueMap[rank], suit, false)
        );
      });
    });
  }

  getDeckOfCards() {
    return this.packOfCards;
  }

  shuffleCards() {
    this.packOfCards.sort(() => 0.5 - Math.random());
  }

  divideCards() {
    this.shuffleCards();
    const cardSets = [];
    for (let i = 0; i < 2; i++) {
      let selectedCards = [];
      for (let j = i; j < 52; j += 2) {
        selectedCards.push(this.packOfCards[j]);
      }
      cardSets.push(selectedCards);
    }
    return cardSets;
  }
}
