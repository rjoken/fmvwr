import "./App.css";
import React, { useState } from "react";
import CardDisplay from "./components/CardDisplay";
import CardsDropdown from "./components/CardsDropdown";
import Title from "./components/Title";
import Card from "./Card";
import cardData from "./assets/cards.json";
import Fusion from "./Fusion";
import Ritual from "./Ritual";
import CardType from "./CardType";
import CardAttribute from "./CardAttribute";

function App() {
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

  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div>
      <Title />
      <CardsDropdown cards={cards} onSelectItem={setSelectedItem} />
      <CardDisplay selectedItem={cards[selectedItem]} />
    </div>
  );
}

export default App;
