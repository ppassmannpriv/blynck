import BaseModel from "../../../model/BaseModel.js";
import dmx from "../../../constants/dmx.js";

export default class Sender extends BaseModel {
  constructor({ ip, subnet, universe, net }) {
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
    this.port = dmx.udpPort;
    this.base_refresh_interval = dmx.base_refresh_interval;
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
