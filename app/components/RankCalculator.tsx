"use client";
import React, { useEffect, useRef, useState } from "react";
import * as RankCalcUtils from "../class/RankCalcState";

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
  const [isVCDropdownOpen, setVCDropdownOpen] = useState<boolean>(false);
  const [isLPDropdownOpen, setLPDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  ): void => {
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

      return updatedState;
    });
  };

  const handleDropdown = (
    key: keyof RankCalcUtils.RankCalcState,
    eventKey: number
  ): void => {
    setRankCalcState((prev) => {
      const updatedState: RankCalcUtils.RankCalcState = {
        ...prev,
        [key]: eventKey,
      };
      updatedState.duelPoints =
        RankCalcUtils.calculateTotalPoints(updatedState);

      setVCDropdownOpen(false);
      setLPDropdownOpen(false);
      return updatedState;
    });
  };

  const toggleVCDropdown = () => {
    setVCDropdownOpen(!isVCDropdownOpen);
  };

  const toggleLPDropdown = () => {
    setLPDropdownOpen(!isLPDropdownOpen);
  };

  /* Reset all values to zero */
  const resetCalc = (): void => {
    setRankCalcState(RankCalcUtils.defaultRankCalcState());
  };

  const aTecMode = (): void => {
    setRankCalcState((prev) => {
      const updatedState = { ...prev, turns: 9, cardsUsed: 37, lifePoints: 2 };
      updatedState.duelPoints = RankCalcUtils.calculateTotalPoints(
        updatedState as RankCalcUtils.RankCalcState
      );
      return updatedState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVCDropdownOpen(false);
        setLPDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="m-10 flex flex-col justify-center items-center">
      <h1>Rank Calculator</h1>
      <div className="grid w-96 gap-5 p-5 border-solid border-4 border-blue-500 bg-blue-400">
        {/* A-Tec Mode Button */}
        <div>
          <button
            className="w-full px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold border-none"
            onClick={() => aTecMode()}
          >
            A-Tec Mode
          </button>
        </div>
        {/* Victory Condition Dropdown */}
        <div className="flex justify-between items-center" ref={dropdownRef}>
          <span className="grow text-left">Victory Condition: </span>
          <button
            id="vcDropdown"
            className="items-center text-white bg-blue-500 hover:bg-blue-600 border-none font-bold px-5 py-2.5 text-center w-48 cursor-pointer"
            type="button"
            onClick={() => toggleVCDropdown()}
          >
            {victoryConditions[rankCalcState.victoryCondition].name}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-sm shadow ${
              isVCDropdownOpen ? "" : "hidden"
            }`}
          >
            <ul className="px-4 text-sm text-gray-700 overflow-auto">
              {victoryConditions.map((vc) => (
                <li
                  className="block py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  key={vc.id}
                  onClick={() => handleDropdown("victoryCondition", vc.id)}
                >
                  {vc.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Life Points Dropdown */}
        <div className="flex justify-between items-center" ref={dropdownRef}>
          <label htmlFor="lpDropdown">Remaining Life Points: </label>
          <button
            id="lpDropdown"
            className="items-center text-white bg-blue-500 hover:bg-blue-600 border-none font-bold px-5 py-2.5 text-center w-48 cursor-pointer"
            type="button"
            onClick={() => toggleLPDropdown()}
          >
            {lifePointsPossible[rankCalcState.lifePoints].name}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 ${
              isLPDropdownOpen ? "" : "hidden"
            }`}
          >
            <ul className="px-4 w-72 text-sm text-gray-700 h-60 overflow-auto">
              {lifePointsPossible.map((lp) => (
                <li
                  className="block py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  key={lp.id}
                  onClick={() => handleDropdown("lifePoints", lp.id)}
                >
                  {lp.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Rank Calc Variables */}
        <div className="flex flex-col gap-2">
          {rankCalcVars.map((rcv) => (
            <div className="flex justify-between items-center" key={rcv.key}>
              <span className="grow text-left">
                {rcv.label} {rankCalcState[rcv.key]}
              </span>
              <button
                className="px-5 py-2.5 w-4 font-bold text-white border-none bg-blue-500 hover:bg-blue-600 cursor-pointer"
                onClick={() => handleButton(rcv.key, ButtonOperator.Minus)}
              >
                {"-"}
              </button>
              <button
                className="ml-2 w-36 py-2.5 font-bold text-white border-none bg-blue-500 hover:bg-blue-600 cursor-pointer"
                onClick={() => handleButton(rcv.key, ButtonOperator.Plus)}
              >
                {"+"}
              </button>
            </div>
          ))}
        </div>
        {/* Rank Display and Reset Button*/}
        <div className="flex justify-between gap-2">
          <span className="grow text-left">
            Current rank: {rankCalcState.duelPoints} <br />
            <b>{RankCalcUtils.getRankFromPoints(rankCalcState)}</b>
          </span>
          <button
            className="ml-2 w-48 px-5 py-2.5 font-bold text-white border-none bg-blue-500 hover:bg-blue-600"
            onClick={() => resetCalc()}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default RankCalculator;
