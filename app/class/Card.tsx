import CardAttribute from "./CardAttribute";
import CardType from "./CardType";
import Fusion from "./Fusion";
import GuardianStar from "./GuardianStar";
import Ritual from "./Ritual";

export interface Card {
  name: string;
  description: string;
  id: number;
  guardianStarA: GuardianStar;
  guardianStarB: GuardianStar;
  level: number;
  type: CardType;
  attribute: CardAttribute;
  attack: number;
  defense: number;
  cost: number;
  password: string;
  equips: number[];
  fusions: Fusion[];
  rituals: Ritual[];
}

export interface CardDictionary {
  [id: number]: Card;
}
