import Dmxlib from "dmxnet";
import dmxConfig from "../../constants/dmx.js";

export default class Dmxnet {
  constructor() {}

  static create() {
    return new Dmxlib.dmxnet({
      log: {
        level: dmxConfig.logLevel,
      },
      oem: 0,
      sName: dmxConfig.name,
      lName: dmxConfig.desc,
      hosts: dmxConfig.hosts,
    });
  }
}
