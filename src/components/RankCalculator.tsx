import { useMemo, useState } from "react";
import styles from "./RankCalculator.module.css";
import { Button, Dropdown, DropdownMenu } from "react-bootstrap";
import * as RankCalcUtils from "../RankCalcState";

/* Assign these IDs to different victory types and life point thresholds */
const victoryConditions: { name: string; id: number }[] = [
  { name: "Total Annihilation", id: 0 },
  { name: "Victory by Attrition", id: 1 },
  { name: "Victory by Exodia", id: 2 },
];

const lifePointsPossible: { name: string; id: number }[] = [
  { name: "8000", id: 0 },
  { name: "7000-7999", id: 1 },
  { name: "1000-6999", id: 2 },
  { name: "100-999", id: 3 },
  { name: "<100", id: 4 },
];

/*
 * "map" of information for buttons and labels, at least for the simple controls.
 * Dropdowns created more manually.
 */
const rankCalcVars: {
  label: string;
  key: keyof RankCalcUtils.RankCalcState;
}[] = [
  { label: "Fusions: ", key: "fusions" },
  { label: "Effective attacks: ", key: "effectives" },
  { label: "Facedown plays: ", key: "facedowns" },
  { label: "Magics activated: ", key: "magics" },
  { label: "Equips used: ", key: "equips" },
  { label: "Traps activated: ", key: "traps" },
  { label: "Defensive wins: ", key: "defensives" },
  { label: "Cards used: ", key: "cardsUsed" },
  { label: "Turns: ", key: "turns" },
];

enum ButtonOperator {
  Plus = 0,
  Minus = 1,
}

function RankCalculator() {
  /* State of rank calculator variables stored in RankCalcState object */
  const [rankCalcState, setRankCalcState] =
    useState<RankCalcUtils.RankCalcState>(RankCalcUtils.defaultRankCalcState());

  /*
   * When a plus or minus button is clicked, set the counts appropriately
   * Handle dynamically given a key of the state object to update, and whether we are +ing or -ing
   */
  const handleButton = (
    key: keyof RankCalcUtils.RankCalcState,
    operation: ButtonOperator
  ) => {
    setRankCalcState((prev) => {
      /*
       * Return the previous RankCalcState, with the [key] property changed using spread operator.
       * If the operation is not +, and -ing 1 from the current RankCalcState would be <= 0, return prev.
       * Do not want minus values!
       */
      const value = prev[key];
      let newValue;

      if (operation === ButtonOperator.Plus) {
        newValue = value + 1;
      } else {
        newValue = value > 0 ? value - 1 : value;
      }

      const updatedState: RankCalcUtils.RankCalcState = {
        ...prev,
        [key]: newValue,
      };
      updatedState.duelPoints =
        RankCalcUtils.calculateTotalPoints(updatedState);

      return { ...updatedState };
    });
  };

  /* Reset all values to zero */
  const resetCalc = () => {
    setRankCalcState(RankCalcUtils.defaultRankCalcState());
  };

  const aTecMode = () => {
    setRankCalcState((prev) => {
      const updatedState = { ...prev, turns: 9, cardsUsed: 37, lifePoints: 2 };
      updatedState.duelPoints = RankCalcUtils.calculateTotalPoints(
        updatedState as RankCalcUtils.RankCalcState
      );
      return updatedState;
    });
  };

  return (
    <>
      <h1>Rank Calculator</h1>
      <div className={styles.calculator}>
        <div>
          <Button className={styles.fullWidthButton} onClick={() => aTecMode()}>
            A-Tec Mode
          </Button>
        </div>
        <div className={styles.vcContainer}>
          <label htmlFor="vcDropdown">Victory Condition: </label>
          <Dropdown
            id="vcDropdown"
            onSelect={(eventKey) =>
              setRankCalcState({
                ...rankCalcState,
                victoryCondition: Number(eventKey),
              })
            }
          >
            <Dropdown.Toggle id="dropdown-basic" className={styles.dropButton}>
              {victoryConditions[rankCalcState.victoryCondition].name}
            </Dropdown.Toggle>
            <DropdownMenu>
              {victoryConditions.map((vc) => (
                <Dropdown.Item key={vc.id} eventKey={vc.id}>
                  {vc.name}
                </Dropdown.Item>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.lpContainer}>
          <label htmlFor="lpDropdown">Remaining Life Points: </label>
          <Dropdown
            id="lpDropdown"
            onSelect={(eventKey) =>
              setRankCalcState({
                ...rankCalcState,
                lifePoints: Number(eventKey),
              })
            }
          >
            <Dropdown.Toggle id="dropdown-basic" className={styles.dropButton}>
              {lifePointsPossible[rankCalcState.lifePoints].name}
            </Dropdown.Toggle>
            <DropdownMenu>
              {lifePointsPossible.map((lp) => (
                <Dropdown.Item key={lp.id} eventKey={lp.id}>
                  {lp.name}
                </Dropdown.Item>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.varsContainer}>
          {rankCalcVars.map((rcv) => (
            <div className={styles.rankVar} key={rcv.key}>
              <span className={styles.varLabel}>
                {rcv.label} {rankCalcState[rcv.key]}
              </span>
              <Button
                className={styles.minusButton}
                onClick={() => handleButton(rcv.key, ButtonOperator.Minus)}
              >
                -
              </Button>
              <Button
                className={styles.plusButton}
                onClick={() => handleButton(rcv.key, ButtonOperator.Plus)}
              >
                +
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.rankDisplay}>
          <span className={styles.varLabel}>
            Current rank: {rankCalcState.duelPoints}
            {" :: "}
            <b>{RankCalcUtils.getRankFromPoints(rankCalcState)}</b>
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
