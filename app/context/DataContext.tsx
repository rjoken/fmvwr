"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import cardData from "../data/cards.json";
import { Card, CardDictionary } from "../class/Card";
import CardType from "../class/CardType";
import CardAttribute from "../class/CardAttribute";
import Fusion from "../class/Fusion";
import Ritual from "../class/Ritual";

interface DataContextProps {
  data: CardDictionary;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<CardDictionary>({});

  useEffect(() => {
    // map json items to card dictionary matching Card interface
    const dataDictionary: CardDictionary = cardData.reduce((dict, jsonItem) => {
      const card: Card = {
        name: jsonItem.Name,
        description: jsonItem.Description,
        id: jsonItem.Id,
        guardianStarA: jsonItem.GuardianStarA,
        guardianStarB: jsonItem.GuardianStarB,
        level: jsonItem.Level,
        type: jsonItem.Type as CardType,
        attribute: jsonItem.Attribute as CardAttribute,
        attack: jsonItem.Attack,
        defense: jsonItem.Defense,
        cost: jsonItem.Stars,
        password: jsonItem.CardCode,
        equips: jsonItem.Equip,
        fusions: jsonItem.Fusions.map(
          (fusion: any) =>
            ({
              card1: fusion._card1,
              card2: fusion._card2,
              result: fusion._result,
            } as Fusion)
        ),
        rituals: jsonItem.Ritual.map(
          (ritual: any) =>
            ({
              ritualCard: ritual.RitualCard,
              card1: ritual.Card1,
              card2: ritual.Card2,
              card3: ritual.Card3,
              result: ritual.Card3,
            } as Ritual)
        ),
      };
      dict[card.id] = card;
      return dict;
    }, {} as CardDictionary);
    setData(dataDictionary);
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
