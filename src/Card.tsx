import GuardianStar from "./GuardianStar";
import CardType from "./CardType";
import CardAttribute from "./CardAttribute";
import Fusion from "./Fusion";
import Ritual from "./Ritual";

class Card {
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

  constructor(
    name: string,
    description: string,
    id: number,
    guardianStarA: GuardianStar,
    guardianStarB: GuardianStar,
    level: number,
    type: CardType,
    attribute: CardAttribute,
    attack: number,
    defense: number,
    cost: number,
    password: string,
    equips: number[],
    fusions: Fusion[],
    rituals: Ritual[]
  ) {
    this.name = name;
    this.description = description;
    this.id = id;
    this.guardianStarA = guardianStarA;
    this.guardianStarB = guardianStarB;
    this.level = level;
    this.type = type;
    this.attribute = attribute;
    this.attack = attack;
    this.defense = defense;
    this.cost = cost;
    this.password = password;
    this.equips = equips;
    this.fusions = fusions;
    this.rituals = rituals;
  }
}

export default Card;
