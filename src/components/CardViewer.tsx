import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Card";
import cardData from "../assets/cards.json";
import CardAttribute from "../CardAttribute";
import CardType from "../CardType";
import CardDisplay from "./CardDisplay";
import CardsDropdown from "./CardsDropdown";

function CardViewer() {
  // Initialise the card data so that we can choose them from the dropdown
  const cards: Card[] = cardData.map(
    (item: {
      Name: string;
      Description: string;
      Id: number;
      GuardianStarA: number;
      GuardianStarB: number;
      Level: number;
      Type: number;
      Attack: number;
      Defense: number;
      Stars: number;
      CardCode: string;
      Equip: number[];
      Fusions: { _card1: number; _card2: number; _result: number }[];
      Ritual: {
        RitualCard: number;
        Card1: number;
        Card2: number;
        Card3: number;
        Result: number;
      }[];
      Attribute: number;
    }) => {
      return new Card(
        item.Name,
        item.Description,
        item.Id,
        item.GuardianStarA,
        item.GuardianStarB,
        item.Level,
        item.Type as CardType,
        item.Attribute as CardAttribute,
        item.Attack,
        item.Defense,
        item.Stars,
        item.CardCode,
        item.Equip,
        item.Fusions.map((fusion) => ({
          card1: fusion._card1,
          card2: fusion._card2,
          result: fusion._result,
        })),
        item.Ritual.map((ritual) => ({
          ritualCard: ritual.RitualCard,
          card1: ritual.Card1,
          card2: ritual.Card2,
          card3: ritual.Card3,
          result: ritual.Card3,
        }))
      );
    }
  );

  /* Finds the index of a card in the cards array given an id number.
   * Returns the index if the id is found, and 0 otherwise.
   */
  const getCardIndexById = function (cards: Card[], id: number): number {
    let result = cards.findIndex((c) => c.id == id);
    if (result == -1) {
      return 0;
    } else {
      return result;
    }
  };

  const [urlCard, setUrlCard] = useSearchParams();
  const defaultId = Number(urlCard.get("card"));
  const [selectedItem, setSelectedItem] = useState<number>(
    getCardIndexById(cards, defaultId)
  );

  // updates card id in url when selectedItem is changed
  useEffect(() => {
    setUrlCard({ card: String(cards[selectedItem].id) });
  }, [selectedItem]);

  return (
    <>
      <h1>Card Viewer</h1>
      <CardsDropdown
        cards={cards}
        onSelectItem={(item) => setSelectedItem(getCardIndexById(cards, item))}
      />
      <CardDisplay selectedItem={cards[selectedItem]} />
    </>
  );
}

export default CardViewer;
