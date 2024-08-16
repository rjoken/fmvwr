import GuardianStar from "./GuardianStar";
import CardType from "./CardType";
import CardAttribute from "./CardAttribute";
import Fusion from "./Fusion";
import Ritual from "./Ritual";

class Card {
  constructor(
    public name: string,
    public description: string,
    public id: number,
    public guardianStarA: GuardianStar,
    public guardianStarB: GuardianStar,
    public level: number,
    public type: CardType,
    public attribute: CardAttribute,
    public attack: number,
    public defense: number,
    public cost: number,
    public password: string,
    public equips: number[],
    public fusions: Fusion[],
    public rituals: Ritual[]
  ) {}
}

export default Card;
