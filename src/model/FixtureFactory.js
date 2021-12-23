import LedBar from "./Fixture/LedBar";

export default class FixtureFactory {
  static create(args) {
    if (args.type === "LedBar") return new LedBar(args);
    if (!args.type) throw new Error("No fixture type given.");
    throw new Error(`Unknown fixture type: ${args.type}.`);
  }
}
