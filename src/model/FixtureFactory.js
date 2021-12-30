import LedBar from "./Fixture/LedBar";
import LaserWorldCS1000RGBMk2 from "./Fixture/LaserWorldCS1000RGBMk2";
export default class FixtureFactory {
  static create(args) {
    if (args.type === "LedBar") return new LedBar(args);
    if (args.type === "LaserWorldCS1000RGBMk2")
      return new LaserWorldCS1000RGBMk2(args);
    if (!args.type) throw new Error("No fixture type given.");
    throw new Error(`Unknown fixture type: ${args.type}.`);
  }
}
