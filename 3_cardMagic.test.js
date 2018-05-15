import {
  findPairSuits,
  drawCard,
  chooseHiddenCardFromPairsuit,
  mod,
  assistantOrderCard,
  Card,
  magicianGuessHiddenCard,
  createDeck
} from "./3_cardMagic";

describe("Card Magic", () => {
  describe("Draw a card", () => {
    it("should draw the only card and have empty deck", () => {
      const deck = [{ suit: 0, rank: 3 }];
      const card = drawCard(deck);
      expect(card).toEqual({ suit: 0, rank: 3 });
      expect(deck.length).toEqual(0);
    });

    it("should throw Error if empty deck", () => {
      const deck = [];
      expect(() => drawCard(deck)).toThrowError("No more cards in the deck");
    });
  });

  describe("Find pair suits", () => {
    it("should find all pair suits", () => {
      const cards = [
        { suit: 0, rank: 1 },
        { suit: 0, rank: 2 },
        { suit: 0, rank: 3 },
        { suit: 1, rank: 2 },
        { suit: 1, rank: 3 },
        { suit: 2, rank: 3 }
      ];
      const pairsuits = findPairSuits(cards);
      expect(pairsuits).toEqual([
        [{ suit: 0, rank: 1 }, { suit: 0, rank: 2 }, { suit: 0, rank: 3 }],
        [{ suit: 1, rank: 2 }, { suit: 1, rank: 3 }]
      ]);
    });
  });

  describe("Choose hidden card from pairsuit", () => {
    it("should pick to rank in clockwise encoding", () => {
      const pairsuit = [
        { suit: 0, rank: 1 },
        { suit: 0, rank: 13 },
        { suit: 0, rank: 12 }
      ];
      const { hidden, other, encode } = chooseHiddenCardFromPairsuit(pairsuit);
      expect(hidden).toEqual({ suit: 0, rank: 1 });
      expect(other).toEqual({ suit: 0, rank: 13 });
      expect(encode).toEqual(1);
    });

    it("should return same result in other order of pairsuits", () => {
      const pairsuit = [{ suit: 0, rank: 13 }, { suit: 0, rank: 1 }];
      const { hidden, other, encode } = chooseHiddenCardFromPairsuit(pairsuit);
      expect(hidden).toEqual({ suit: 0, rank: 1 });
      expect(other).toEqual({ suit: 0, rank: 13 });
      expect(encode).toEqual(1);
    });
  });

  describe("Assistant order cards", () => {
    it("should order cards with encoding", () => {
      const cards = [
        new Card({ suit: 2, rank: 5 }),
        new Card({ suit: 0, rank: 9 }),
        new Card({ suit: 3, rank: 11 }),
        new Card({ suit: 2, rank: 10 }),
        new Card({ suit: 2, rank: 8 })
      ];
      const orderedCards = assistantOrderCard(cards);
      expect(orderedCards).toEqual([
        { suit: 2, rank: 5 },
        { suit: 3, rank: 11 },
        { suit: 2, rank: 8 },
        { suit: 0, rank: 9 }
      ]);
    });
  });

  describe("Magician guess hidden card", () => {
    it("should return the hidden card", () => {
      const cards = [
        new Card({ suit: 2, rank: 5 }),
        new Card({ suit: 3, rank: 11 }),
        new Card({ suit: 2, rank: 8 }),
        new Card({ suit: 0, rank: 9 })
      ];
      const hiddenCard = magicianGuessHiddenCard(cards);
      expect(hiddenCard).toEqual(new Card({ suit: 2, rank: 10 }));
    });
  });

  describe("Whole flow", () => {
    it("should guess all hidden cards", () => {
      for (let i = 0; i < 100; i++) {
        const deck = createDeck();
        const cards = [];
        for (let j = 0; j < 5; j++) {
          const card = drawCard(deck);
          cards.push(card);
        }

        const orderedCards = assistantOrderCard(cards);
        const hiddenCard = magicianGuessHiddenCard(orderedCards);
        const realHiddenCard = cards.filter(
          card => !orderedCards.includes(card)
        )[0];
        expect(hiddenCard).toEqual(realHiddenCard);
      }
    });
  });

  describe("Circular subtraction", () => {
    it("should be return 7 if 7 - 13", () => {
      expect(mod(7 - 13, 13)).toEqual(7);
    });

    it("should be return 6 if 13 - 7", () => {
      expect(mod(13 - 7, 13)).toEqual(6);
    });
  });

  describe("Card", () => {
    it("should return", () => {
      const cardA = new Card({ suit: 0, rank: 1 });
      expect(cardA.valueOf()).toEqual(1.0);
    });

    it("should able to sort", () => {
      const cards = [
        new Card({ suit: 2, rank: 11 }),
        new Card({ suit: 0, rank: 1 }),
        new Card({ suit: 3, rank: 8 })
      ];
      cards.sort((a, b) => a.valueOf() - b.valueOf());
      expect(cards).toEqual([
        new Card({ suit: 0, rank: 1 }),
        new Card({ suit: 3, rank: 8 }),
        new Card({ suit: 2, rank: 11 })
      ]);
    });
  });
});
