import Card from "../Card";
import GuardianStar from "../GuardianStar";
import CardType from "../CardType";
import CardAttribute from "../CardAttribute";
import styles from "./CardDisplay.module.css";

interface Props {
  // selectedItem passed into this component tells it which card to display.
  selectedItem: Card;
}

function CardDisplay({ selectedItem }: Props) {
  // Want to display unicode star character a given number of times based on level
  let starsString: string = "";
  for (let i = 0; i < selectedItem.level; i++) {
    starsString += "★";
  }

  // Styling for different types of cards
  let containerClass: string = styles.monster;
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
      <div className={[styles.ygocard, containerClass].join(" ")}>
        <h3>{selectedItem.id.toString().padStart(3, "0")}</h3>
        <h2>{selectedItem.name}</h2>
        <div className={styles.stars}>{starsString}</div>
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
    </>
  );
}

export default CardDisplay;
