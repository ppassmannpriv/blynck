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
}
