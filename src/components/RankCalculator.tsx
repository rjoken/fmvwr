import { useMemo, useState } from "react";
import styles from "./RankCalculator.module.css";
import { Button, Dropdown, DropdownMenu } from "react-bootstrap";

class RankCalcState {
  // Using a class instead of an interface so that we can have default values
  constructor(
    public victoryCondition: number = 0,
    public lifePoints: number = 0,
    public fusions: number = 0,
    public effectives: number = 0,
    public facedowns: number = 0,
    public magics: number = 0,
    public equips: number = 0,
    public traps: number = 0,
    public defensives: number = 0,
    public cardsUsed: number = 0,
    public turns: number = 0
  ) {}
}

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

/*
 * "map" of information for buttons and labels, at least for the simple controls.
 * Dropdowns created more manually.
 */
const rankCalcVars = [
  { label: "Fusions: ", key: "fusions" as keyof RankCalcState },
  { label: "Effective attacks: ", key: "effectives" as keyof RankCalcState },
  { label: "Facedown plays: ", key: "facedowns" as keyof RankCalcState },
  { label: "Magics activated: ", key: "magics" as keyof RankCalcState },
  { label: "Equips used: ", key: "equips" as keyof RankCalcState },
  { label: "Traps activated: ", key: "traps" as keyof RankCalcState },
  { label: "Defensive wins: ", key: "defensives" as keyof RankCalcState },
  { label: "Cards used: ", key: "cardsUsed" as keyof RankCalcState },
  { label: "Turns: ", key: "turns" as keyof RankCalcState },
];

/*
 * Calculate points for each rank calculation variable
 * This could be generalised into a function that takes a set of values and thresholds,
 * but I find it less readable!
 */
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

/*
 * Final duel score taking all duel variables into account
 * Formula has been reverse-engineered from ingame memory values.
 * Specifically, you can find it at 0x1798A8
 * Read more here: https://datacrystal.tcrf.net/wiki/Yu-Gi-Oh!_Forbidden_Memories/RAM_map
 */
const calculateTotalPoints = (
  victoryCondition: number,
  fusions: number,
  cardsUsed: number,
  facedowns: number,
  effectives: number,
  equips: number,
  magics: number,
  traps: number,
  turns: number,
  defensives: number,
  lifePoints: number
) => {
  let victoryConditionPoints = 0;
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

enum ButtonOperator {
  Plus = 0,
  Minus = 1,
}

function RankCalculator() {
  /* State of rank calculator variables stored in RankCalcState object */
  const [rankCalcState, setRankCalcState] = useState<RankCalcState>(
    new RankCalcState()
  );

  // Update duelPoints whenever rankCalcState is updated
  const [duelPoints, setDuelPoints] = useState<number>(0);
  useMemo(() => {
    setDuelPoints(
      calculateTotalPoints(
        rankCalcState.victoryCondition,
        rankCalcState.fusions,
        rankCalcState.cardsUsed,
        rankCalcState.facedowns,
        rankCalcState.effectives,
        rankCalcState.equips,
        rankCalcState.magics,
        rankCalcState.traps,
        rankCalcState.turns,
        rankCalcState.defensives,
        rankCalcState.lifePoints
      )
    );
  }, [rankCalcState]);

  /*
   * When a plus or minus button is clicked, set the counts appropriately
   * Handle dynamically given a key of the state object to update, and whether we are +ing or -ing
   */
  const handleButton = (
    key: keyof RankCalcState,
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

      return { ...prev, [key]: newValue };
    });
  };

  /* Reset all values to zero */
  const resetCalc = () => {
    setRankCalcState(new RankCalcState());
  };

  return (
    <>
      <h1>Rank Calculator</h1>
      <div className={styles.calculator}>
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
            Current rank: {duelPoints}
            {" :: "}
            <b>{getRankFromPoints(duelPoints)}</b>
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
