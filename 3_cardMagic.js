//@ts-check

/**
 * @class Card
 * @prop {number} suit
 * @prop {number} rank
 */
export class Card {
  constructor({ suit, rank }) {
    this.suit = suit;
    this.rank = rank;
  }

  valueOf() {
    return this.rank + this.suit / 10;
  }

  toString() {
    let suitString;
    switch (this.suit) {
      case 0:
        suitString = "D";
        break;
      case 1:
        suitString = "C";
        break;
      case 2:
        suitString = "H";
        break;
      case 3:
        suitString = "S";
        break;
    }

    let rankString;
    switch (this.rank) {
      case 11:
        rankString = "J";
        break;
      case 12:
        rankString = "Q";
        break;
      case 13:
        rankString = "K";
        break;
      case 1:
        rankString = "A";
        break;
      default:
        rankString = this.rank.toString();
        break;
    }

    return rankString + "_" + suitString;
  }
}

export const createDeck = () => {
  const deck = [];
  for (let i = 0; i < 52; i++) {
    const suit = (i / 13) | 0;
    const rank = i % 13 + 1;
    deck.push(new Card({ suit, rank }));
  }
  return deck;
};

/**
 * @param {Card[]} deck
 */
export const drawCard = deck => {
  if (deck.length === 0) {
    throw new Error("No more cards in the deck");
  }
  const index = Math.round(Math.random() * (deck.length - 1));
  const card = deck[index];
  deck.splice(index, 1);
  return card;
};

/**
 *
 * @param {Card[]} cards
 * @returns {Card[]} orderedCards
 */
export const assistantOrderCard = cards => {
  const pairsuits = findPairSuits(cards);
  if (pairsuits.length === 0) {
    throw new Error("No pairsuits are found, should be impossible");
  }
  const pairsuit = pairsuits[0];

  const { hidden, other, encode } = chooseHiddenCardFromPairsuit(pairsuit);
  const orderedCards = [];
  orderedCards.push(other);

  const remedies = cards
    .filter(card => card !== hidden && card !== other)
    .sort((a, b) => a.valueOf() - b.valueOf());

  switch (encode) {
    case 1:
      orderedCards.push(remedies[0], remedies[1], remedies[2]);
      break;
    case 2:
      orderedCards.push(remedies[0], remedies[2], remedies[1]);
      break;
    case 3:
      orderedCards.push(remedies[1], remedies[2], remedies[0]);
      break;
    case 4:
      orderedCards.push(remedies[1], remedies[0], remedies[2]);
      break;
    case 5:
      orderedCards.push(remedies[2], remedies[0], remedies[1]);
      break;
    case 6:
      orderedCards.push(remedies[2], remedies[1], remedies[0]);
      break;
  }
  return orderedCards;
};

/**
 *
 * @param {Card[]} cards
 * @returns {Card} hidden
 */
export const magicianGuessHiddenCard = cards => {
  // suit
  let suit = cards[0].suit;

  let encode;
  if (cards[1] < cards[2] && cards[1] < cards[3]) {
    if (cards[2] < cards[3]) {
      encode = 1;
    } else {
      encode = 2;
    }
  } else if (cards[1] > cards[2] && cards[1] > cards[3]) {
    if (cards[3] > cards[2]) {
      encode = 5;
    } else {
      encode = 6;
    }
  } else {
    if (cards[1] < cards[2]) {
      encode = 3;
    } else {
      encode = 4;
    }
  }

  let rank = mod(cards[0].rank + encode, 13);
  return new Card({ suit, rank });
};

/**
 *
 * @param {Card[]} pairsuit
 * @returns {{hidden: Card, other: Card, encode: number}}
 */
export const chooseHiddenCardFromPairsuit = pairsuit => {
  if (pairsuit.length < 2) {
    throw new Error("Pairsuit must have at least 2 cards");
  }

  pairsuit.forEach(card => {
    if (card.suit != pairsuit[0].suit) {
      throw new Error("Pairsuit should have same suit");
    }
  });

  let encode = mod(pairsuit[0].rank - pairsuit[1].rank, 13);
  let hiddenIndex;
  if (encode > 0 && encode <= 6) {
    hiddenIndex = 0;
  } else {
    hiddenIndex = 1;
    encode = mod(pairsuit[1].rank - pairsuit[0].rank, 13);
  }
  return {
    hidden: pairsuit[hiddenIndex],
    other: pairsuit[hiddenIndex ? 0 : 1],
    encode: encode
  };
};

export const mod = (x, m) => {
  const result = (x % m + m) % m;
  return result === 0 ? m : result;
};

/**
 *
 * @param {Card[]} cards
 * @returns {Card[][]} pairsuits
 */
export const findPairSuits = cards => {
  const suits = Array.from({ length: 4 }, () => []);
  for (let card of cards) {
    if (card.suit < 0 || card.suit > 3) {
      throw new Error("card suit out of range");
    }
    suits[card.suit].push(card);
  }
  return suits.filter(suit => suit.length >= 2);
};
