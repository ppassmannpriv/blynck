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

/**
 * @TODO: This config needs a model and shit. At least validation. Invalid shit, will mess us up.
 * {
      ip: "192.168.1.224", //IP to send to, default 255.255.255.255
      subnet: 0, //Destination subnet, default 0
      universe: 1, //Destination universe, default 0
      net: 0, //Destination net, default 0
      port: 6454, //Destination UDP Port, default 6454
      base_refresh_interval: 10000, // Default interval for sending unchanged ArtDmx
    }
 */
