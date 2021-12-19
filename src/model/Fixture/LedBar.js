import Fixture from "../Fixture.js";

export default class LedBar extends Fixture {
  constructor(
    lengthInCm,
    ledCount,
    isRgb = false,
    universe = null,
    startChannel = null
  ) {
    const channels = Math.ceil((lengthInCm / 100) * ledCount * (isRgb ? 3 : 1));
    super(universe, startChannel, channels);
    this.lengthInCm = lengthInCm;
    this.ledCount = ledCount;
    this.isRgb = isRgb;
  }

  setLengthInCm(lengthInCm) {
    this.lengthInCm = lengthInCm;

    return this;
  }

  setLedCount(ledCount) {
    this.ledCount = ledCount;

    return this;
  }
}
