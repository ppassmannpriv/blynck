import BaseModel from "../../../model/BaseModel.js";

export default class Sender extends BaseModel {
  constructor({ ip, subnet, universe, net, port, base_refresh_interval }) {
    super({
      ip: String,
      subnet: Number,
      universe: Number,
      net: Number,
      port: Number,
      base_refresh_interval: Number,
    });

    this.ip = ip;
    this.subnet = subnet;
    this.universe = universe;
    this.net = net;
    this.port = port;
    this.base_refresh_interval = base_refresh_interval;
  }

  getConfig() {
    return {
      ip: this.ip,
      subnet: this.subnet,
      universe: this.universe,
      net: this.net,
      port: this.port,
      base_refresh_interval: this.base_refresh_interval,
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
