import React, { useState } from "react";
import styles from "./RankCalculator.module.css";
import { Button, Dropdown, DropdownMenu } from "react-bootstrap";

function RankCalculator() {
  /* Assign these IDs to different victory types and life point thresholds */
  const victoryConditions = [
    { name: "Total Annihilation", id: 0 },
    { name: "Victory by Attrition", id: 1 },
    { name: "Victory by Exodia", id: 2 },
  ];

  const lifePointsPossible = [
    { name: "8000", id: 0 },
    { name: "7000-7999", id: 1 },
    { name: "1000-6999", id: 2 },
    { name: "100-999", id: 3 },
    { name: "<100", id: 4 },
  ];

  /* Rank calculation variables as states */
  const [victoryCondition, setVictoryCondition] = useState(0);
  const [lifePoints, setLifePoints] = useState(0);
  const [fusions, setFusions] = useState(0);
  const [effectives, setEffectives] = useState(0);
  const [facedowns, setFacedowns] = useState(0);
  const [magics, setMagics] = useState(0);
  const [equips, setEquips] = useState(0);
  const [traps, setTraps] = useState(0);
  const [defensives, setDefensives] = useState(0);
  const [cardsUsed, setCardsUsed] = useState(0);
  const [turns, setTurns] = useState(0);

  /* When a plus or minus button is clicked, set the counts appropriately */
  const clickAddFusions = () => {
    setFusions((fusions) => fusions + 1);
  };

  const clickMinusFusions = () => {
    fusions > 0 && setFusions((fusions) => fusions - 1);
  };

  const clickAddEffectives = () => {
    setEffectives((effectives) => effectives + 1);
  };

  const clickMinusEffectives = () => {
    effectives > 0 && setEffectives((effectives) => effectives - 1);
  };

  const clickAddFacedowns = () => {
    setFacedowns((facedowns) => facedowns + 1);
  };

  const clickMinusFacedowns = () => {
    facedowns > 0 && setFacedowns((facedowns) => facedowns - 1);
  };

  const clickAddMagics = () => {
    setMagics((magics) => magics + 1);
  };

  const clickMinusMagics = () => {
    magics > 0 && setMagics((magics) => magics - 1);
  };

  const clickAddEquips = () => {
    setEquips((equips) => equips + 1);
  };

  const clickMinusEquips = () => {
    equips > 0 && setEquips((equips) => equips - 1);
  };

  const clickAddTraps = () => {
    setTraps((traps) => traps + 1);
  };

  const clickMinusTraps = () => {
    traps > 0 && setTraps((traps) => traps - 1);
  };

  const clickAddDefensives = () => {
    setDefensives((defensives) => defensives + 1);
  };

  const clickMinusDefensives = () => {
    defensives > 0 && setDefensives((defensives) => defensives - 1);
  };

  const clickAddCardsUsed = () => {
    setCardsUsed((cardsUsed) => cardsUsed + 1);
  };

  const clickMinusCardsUsed = () => {
    cardsUsed > 0 && setCardsUsed((cardsUsed) => cardsUsed - 1);
  };

  const clickAddTurns = () => {
    setTurns((turns) => turns + 1);
  };

  const clickMinusTurns = () => {
    turns > 0 && setTurns((turns) => turns - 1);
  };

  /* Calculate points for each rank calculation variable */
  const getTurnPoints = (turns: number) => {
    if (turns <= 4) return 12;
    else if (turns <= 8) return 8;
    else if (turns <= 28) return 0;
    else if (turns <= 32) return -8;
    else return -12;
  };

  const getEffectivePoints = (effectives: number) => {
    if (effectives <= 1) return 4;
    else if (effectives <= 3) return 2;
    else if (effectives <= 9) return 0;
    else if (effectives <= 19) return -2;
    else return -4;
  };

  const getDefensivePoints = (defensives: number) => {
    if (defensives <= 1) return 0;
    else if (defensives <= 5) return -10;
    else if (defensives <= 9) return -20;
    else if (defensives <= 14) return -30;
    else return -40;
  };

  const getFacedownPoints = (facedowns: number) => {
    if (facedowns < 1) return 0;
    else if (facedowns <= 10) return -2;
    else if (facedowns <= 20) return -4;
    else if (facedowns <= 30) return -6;
    else return -8;
  };

  const getFusionPoints = (fusions: number) => {
    if (fusions < 1) return 4;
    else if (fusions <= 4) return 0;
    else if (fusions <= 9) return -4;
    else if (fusions <= 14) return -8;
    else return -12;
  };

  const getEquipPoints = (equips: number) => {
    if (equips < 1) return 4;
    else if (equips <= 4) return 0;
    else if (equips <= 9) return -4;
    else if (equips <= 14) return -8;
    else return -12;
  };

  const getMagicPoints = (magics: number) => {
    if (magics < 1) return 2;
    else if (magics <= 3) return -4;
    else if (magics <= 6) return -8;
    else if (magics <= 9) return -12;
    else return -16;
  };

  const getTrapPoints = (traps: number) => {
    if (traps < 1) return 2;
    else if (traps <= 2) return -8;
    else if (traps <= 4) return -16;
    else if (traps <= 6) return -24;
    else return -32;
  };

  const getCardsPoints = (cardsUsed: number) => {
    if (cardsUsed <= 8) return 15;
    else if (cardsUsed <= 12) return 12;
    else if (cardsUsed <= 32) return 0;
    else if (cardsUsed <= 36) return -5;
    else return -7;
  };

  const getLPPoints = (lp: number) => {
    switch (lp) {
      case 0:
        return 6;
      case 1:
        return 4;
      case 2:
        return 0;
      case 3:
        return -5;
      case 4:
        return -7;
      default:
        return 6;
    }
  };

  /* Final duel score taking all duel variables into account */
  const calculateTotalPoints = () => {
    var victoryConditionPoints = 0;
    if (victoryCondition === 0) victoryConditionPoints = 2;
    else if (victoryCondition === 1) victoryConditionPoints = -40;
    else if (victoryCondition === 2) victoryConditionPoints = 40;
    return (
      50 +
      getFusionPoints(fusions) +
      getCardsPoints(cardsUsed) +
      getFacedownPoints(facedowns) +
      getEffectivePoints(effectives) +
      getEquipPoints(equips) +
      getMagicPoints(magics) +
      getTrapPoints(traps) +
      getTurnPoints(turns) +
      getDefensivePoints(defensives) +
      getLPPoints(lifePoints) +
      victoryConditionPoints
    );
  };

  /* Convert points value into actual rank string */
  const getRankFromPoints = (points: number) => {
    if (points <= 9) return "S-TEC";
    else if (points <= 19) return "A-TEC";
    else if (points <= 29) return "B-TEC";
    else if (points <= 39) return "C-TEC";
    else if (points <= 49) return "D-TEC";
    else if (points <= 59) return "D-POW";
    else if (points <= 69) return "C-POW";
    else if (points <= 79) return "B-POW";
    else if (points <= 89) return "A-POW";
    else return "S-POW";
  };

  /* Reset all values to zero */
  const resetCalc = () => {
    setFusions(0);
    setEffectives(0);
    setFacedowns(0);
    setMagics(0);
    setEquips(0);
    setTraps(0);
    setDefensives(0);
    setCardsUsed(0);
    setTurns(0);
    setLifePoints(0);
    setVictoryCondition(0);
  };

  return (
    <>
      <h1>Rank Calculator</h1>
      <div className={styles.calculator}>
        <div className={styles.vcContainer}>
          <label htmlFor="vcDropdown">Victory Condition: </label>
          <Dropdown
            id="vcDropdown"
            onSelect={(eventKey) => setVictoryCondition(Number(eventKey))}
          >
            <Dropdown.Toggle id="dropdown-basic" className={styles.dropButton}>
              {
                victoryConditions.filter((vc) => vc.id === victoryCondition)[0]
                  .name
              }
            </Dropdown.Toggle>
            <DropdownMenu>
              {victoryConditions.map((vc) => (
                <Dropdown.Item eventKey={vc.id}>{vc.name}</Dropdown.Item>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.lpContainer}>
          <label htmlFor="lpDropdown">Remaining Life Points: </label>
          <Dropdown
            id="lpDropdown"
            onSelect={(eventKey) => setLifePoints(Number(eventKey))}
          >
            <Dropdown.Toggle id="dropdown-basic" className={styles.dropButton}>
              {lifePointsPossible.filter((lp) => lp.id === lifePoints)[0].name}
            </Dropdown.Toggle>
            <DropdownMenu>
              {lifePointsPossible.map((lp) => (
                <Dropdown.Item eventKey={lp.id}>{lp.name}</Dropdown.Item>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.varsContainer}>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Fusions: {fusions} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusFusions()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddFusions()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>
              Effective Attacks: {effectives}{" "}
            </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusEffectives()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddEffectives()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>
              Facedown plays: {facedowns}{" "}
            </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusFacedowns()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddFacedowns()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Magics activated: {magics} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusMagics()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddMagics()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Equips used: {equips} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusEquips()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddEquips()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Traps activated: {traps} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusTraps()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddTraps()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>
              Defensive wins: {defensives}{" "}
            </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusDefensives()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddDefensives()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Cards used: {cardsUsed} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusCardsUsed()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddCardsUsed()}
            >
              +
            </Button>
          </div>
          <div className={styles.rankVar}>
            <span className={styles.varLabel}>Turns: {turns} </span>
            <Button
              className={styles.minusButton}
              onClick={() => clickMinusTurns()}
            >
              -
            </Button>
            <Button
              className={styles.plusButton}
              onClick={() => clickAddTurns()}
            >
              +
            </Button>
          </div>
        </div>
        <div className={styles.rankDisplay}>
          <span>
            Current rank: {calculateTotalPoints()}
            {" :: "}
            <b>{getRankFromPoints(calculateTotalPoints())}</b>
          </span>
          <Button className={styles.resetButton} onClick={() => resetCalc()}>
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}

export default RankCalculator;
