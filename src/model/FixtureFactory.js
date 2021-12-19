import LedBar from "./Fixture/LedBar";

export default class FixtureFactory {
  static create(args) {
    if (args.type === "LedBar") return new LedBar(args);
  }
}
