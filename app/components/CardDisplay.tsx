import React from "react";
import Image from "next/image";
import "./CardDisplay.css";
import { Card } from "../class/Card";
import CardType from "../class/CardType";
import GuardianStar from "../class/GuardianStar";
import CardAttribute from "../class/CardAttribute";

interface Props {
  selectedItem: Card;
}

function CardDisplay({ selectedItem }: Props) {
  // Want to display unicode star character a given number of times based on level
  let starsString: string = "";
  for (let i = 0; i < selectedItem.level; i++) {
    starsString += "★";
  }

  // Styling for different types of cards
  let containerClass: string = "monster";
  if (
    selectedItem.type === CardType.Magic ||
    selectedItem.type === CardType.Equip
  ) {
    containerClass = "monster";
  } else if (selectedItem.type === CardType.Trap) {
    containerClass = "trap";
  } else if (selectedItem.type === CardType.Ritual) {
    containerClass = "magic";
  }

  return (
    <div
      className={
        "flex flex-col items-center text-center w-80 p-5 m-5 " + containerClass
      }
    >
      <div className="text-xl font-bold">
        {selectedItem.id.toString().padStart(3, "0")}
      </div>
      <div className="text-2xl font-bold">{selectedItem.name}</div>
      <div className="flex-row">{starsString}</div>
      <img
        className="m-4 shadow-md shadow-black"
        src={`/CardImages/${selectedItem.id}.png`}
        alt={selectedItem.name}
      />

      <p>{selectedItem.description}</p>
      <p>
        {selectedItem.attribute != CardAttribute.Magic &&
          selectedItem.attribute != CardAttribute.Trap &&
          GuardianStar[selectedItem.guardianStarA] +
            " / " +
            GuardianStar[selectedItem.guardianStarB]}
      </p>
      <p>
        {selectedItem.attribute != CardAttribute.Trap
          ? CardType[selectedItem.type] +
            " / " +
            CardAttribute[selectedItem.attribute]
          : CardType[selectedItem.type]}
      </p>
      <p>
        {selectedItem.attribute != CardAttribute.Magic &&
          selectedItem.attribute != CardAttribute.Trap &&
          "ATK: " +
            selectedItem.attack +
            " / " +
            "DEF: " +
            selectedItem.defense}
      </p>
      <p>
        {selectedItem.password} ({selectedItem.cost})
      </p>
    </div>
  );
}

export default CardDisplay;
