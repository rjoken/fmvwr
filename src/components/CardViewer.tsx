import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Card";
import cardData from "../assets/cards.json";
import CardAttribute from "../CardAttribute";
import CardType from "../CardType";
import CardDisplay from "./CardDisplay";
import CardsDropdown from "./CardsDropdown";

/*
 * Initialise the card data so that we can choose them from the dropdown
 * Dictionary with card id as key
 */
const cards: { [id: number]: Card } = cardData.reduce(
  (acc: { [id: number]: Card }, item) => {
    acc[item.Id] = new Card(
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
    return acc;
  },
  {} as { [id: number]: Card }
);

function CardViewer() {
  // get "card" url parameter
  const [urlCard, setUrlCard] = useSearchParams();
  const defaultId = Number(urlCard.get("card"));

  // if defaultId is a valid key of cards dictionary, use it, otherwise 1
  const [selectedItem, setSelectedItem] = useState<number>(
    defaultId in cards ? defaultId : 1
  );

  // updates card id in url when selectedItem is changed
  useEffect(() => {
    setUrlCard({ card: String(cards[selectedItem].id) });
  }, [selectedItem]);

  return (
    <>
      <h1>Card Viewer</h1>
      <CardsDropdown
        cards={Object.values(cards)}
        onSelectItem={(item) => setSelectedItem(cards[item].id)}
      />
      <CardDisplay selectedItem={cards[selectedItem]} />
    </>
  );
}

export default CardViewer;
