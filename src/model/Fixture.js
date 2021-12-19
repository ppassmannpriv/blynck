import dmx from "../constants/dmx.js";

export default class Fixture {
  constructor({ universe, startChannel, channels }) {
    this.id = null;
    this.universe = universe;
    this.startChannel = startChannel;
    this.channels = channels;
    this.validate();
  }

  setUniverse(universe) {
    this.universe = universe;

    return this;
  }

  setStartChannel(startChannel) {
    this.startChannel = startChannel;

    return this;
  }

  setChannels(channels) {
    this.channels = channels;
  }

  validate() {
    if (this.channels > dmx.base)
      throw new Error(
        "Too many channels, your fixture will not fit into one universe!"
      );
    if (this.channels + this.startChannel > dmx.base)
      throw new Error(
        `Fixture has too many channels to fit into one universe. Starts at: ${this.startChannel} Total Channels: ${this.channels}`
      );
  }

  static listAvailableFixtureTypes() {
    return ["LedBar"];
  }
}
