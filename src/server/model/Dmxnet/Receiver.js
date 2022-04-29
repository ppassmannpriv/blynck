import BaseModel from "../../../model/BaseModel.js";

export default class Receiver extends BaseModel {
  constructor({ subnet, universe, net, subUniverse }) {
    super({
      subnet: Number,
      universe: Number,
      net: Number,
      subUniverse: Number,
    });

    this.subnet = subnet;
    this.universe = universe;
    this.net = net;
    this.subUniverse = subUniverse;
  }

  getConfig() {
    return {
      subnet: this.subnet,
      universe: this.universe,
      net: this.net,
      subuni: this.subUniverse,
    };
  }
}
