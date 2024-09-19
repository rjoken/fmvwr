export interface RankCalcState {
  victoryCondition: number;
  lifePoints: number;
  fusions: number;
  effectives: number;
  facedowns: number;
  magics: number;
  equips: number;
  traps: number;
  defensives: number;
  cardsUsed: number;
  turns: number;
  duelPoints: number;
}

export const defaultRankCalcState = (): RankCalcState => {
  const state = {
    victoryCondition: 0,
    lifePoints: 0,
    fusions: 0,
    effectives: 0,
    facedowns: 0,
    magics: 0,
    equips: 0,
    traps: 0,
    defensives: 0,
    cardsUsed: 0,
    turns: 0,
    duelPoints: 0, // This will be recalculated
  };
  state.duelPoints = calculateTotalPoints(state);
  return state;
};

/*
 * Calculate points for each rank calculation variable
 * This could be generalised into a function that takes a set of values and thresholds,
 * but I find it less readable!
 */
export const getTurnPoints = (state: RankCalcState): number => {
  if (state.turns <= 4) return 12;
  else if (state.turns <= 8) return 8;
  else if (state.turns <= 28) return 0;
  else if (state.turns <= 32) return -8;
  else return -12;
};

export const getEffectivePoints = (state: RankCalcState): number => {
  if (state.effectives <= 1) return 4;
  else if (state.effectives <= 3) return 2;
  else if (state.effectives <= 9) return 0;
  else if (state.effectives <= 19) return -2;
  else return -4;
};

export const getDefensivePoints = (state: RankCalcState): number => {
  if (state.defensives <= 1) return 0;
  else if (state.defensives <= 5) return -10;
  else if (state.defensives <= 9) return -20;
  else if (state.defensives <= 14) return -30;
  else return -40;
};

export const getFacedownPoints = (state: RankCalcState): number => {
  if (state.facedowns < 1) return 0;
  else if (state.facedowns <= 10) return -2;
  else if (state.facedowns <= 20) return -4;
  else if (state.facedowns <= 30) return -6;
  else return -8;
};

export const getFusionPoints = (state: RankCalcState): number => {
  if (state.fusions < 1) return 4;
  else if (state.fusions <= 4) return 0;
  else if (state.fusions <= 9) return -4;
  else if (state.fusions <= 14) return -8;
  else return -12;
};

export const getEquipPoints = (state: RankCalcState): number => {
  if (state.equips < 1) return 4;
  else if (state.equips <= 4) return 0;
  else if (state.equips <= 9) return -4;
  else if (state.equips <= 14) return -8;
  else return -12;
};

export const getMagicPoints = (state: RankCalcState): number => {
  if (state.magics < 1) return 2;
  else if (state.magics <= 3) return -4;
  else if (state.magics <= 6) return -8;
  else if (state.magics <= 9) return -12;
  else return -16;
};

export const getTrapPoints = (state: RankCalcState): number => {
  if (state.traps < 1) return 2;
  else if (state.traps <= 2) return -8;
  else if (state.traps <= 4) return -16;
  else if (state.traps <= 6) return -24;
  else return -32;
};

export const getCardsPoints = (state: RankCalcState): number => {
  if (state.cardsUsed <= 8) return 15;
  else if (state.cardsUsed <= 12) return 12;
  else if (state.cardsUsed <= 32) return 0;
  else if (state.cardsUsed <= 36) return -5;
  else return -7;
};

export const getLPPoints = (state: RankCalcState): number => {
  switch (state.lifePoints) {
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

export const getVCPoints = (state: RankCalcState): number => {
  switch (state.victoryCondition) {
    case 0:
      return 2;
    case 1:
      return -40;
    case 2:
      return 40;
    default:
      return 2;
  }
};

/*
 * Final duel score taking all duel variables into account
 * Formula has been reverse-engineered from ingame memory values.
 * Specifically, you can find it at 0x1798A8
 * Read more here: https://datacrystal.tcrf.net/wiki/Yu-Gi-Oh!_Forbidden_Memories/RAM_map
 */
export const calculateTotalPoints = (state: RankCalcState): number => {
  return (
    50 +
    getFusionPoints(state) +
    getCardsPoints(state) +
    getFacedownPoints(state) +
    getEffectivePoints(state) +
    getEquipPoints(state) +
    getMagicPoints(state) +
    getTrapPoints(state) +
    getTurnPoints(state) +
    getDefensivePoints(state) +
    getLPPoints(state) +
    getVCPoints(state)
  );
};

/* Convert points value into actual rank string */
export const getRankFromPoints = (state: RankCalcState): string => {
  if (state.duelPoints <= 9) return "S-TEC";
  else if (state.duelPoints <= 19) return "A-TEC";
  else if (state.duelPoints <= 29) return "B-TEC";
  else if (state.duelPoints <= 39) return "C-TEC";
  else if (state.duelPoints <= 49) return "D-TEC";
  else if (state.duelPoints <= 59) return "D-POW";
  else if (state.duelPoints <= 69) return "C-POW";
  else if (state.duelPoints <= 79) return "B-POW";
  else if (state.duelPoints <= 89) return "A-POW";
  else return "S-POW";
};
