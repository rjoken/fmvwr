import React from "react";
import Card from "../Card";
import GuardianStar from "../GuardianStar";
import CardType from "../CardType";
import CardAttribute from "../CardAttribute";
import styles from "./CardDisplay.module.css";

interface Props {
  selectedItem: Card;
}

function CardDisplay({ selectedItem }: Props) {
  var starsString = [];
  for (let i = 0; i < selectedItem.level; i++) {
    starsString.push(<span key={i}>★</span>);
  }
  let containerClass = styles.monster;
  if (
    selectedItem.type === CardType.Magic ||
    selectedItem.type === CardType.Equip
  ) {
    containerClass = styles.magic;
  } else if (selectedItem.type === CardType.Trap) {
    containerClass = styles.trap;
  } else if (selectedItem.type === CardType.Ritual) {
    containerClass = styles.ritual;
  }
  return (
    <>
      <center>
        <div className={[styles.ygocard, containerClass].join(" ")}>
          <h3>{selectedItem.id}</h3>
          <h2>{selectedItem.name}</h2>
          {starsString}
          <br />
          <img src={"/CardImages/" + selectedItem.id + ".png"} />
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
      </center>
    </>
  );
}

export default CardDisplay;
