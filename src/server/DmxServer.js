import Dmxlib from "dmxnet";
import BackendHttp from "./BackendHttp.js";
import { Server } from "socket.io";
import Sender from "./model/Dmxnet/Sender.js";
import websocketConfig from "../constants/websocket.js";
import dmxConfig from "../constants/dmx.js";

export default class DmxServer {
  constructor() {
    this.backend = new BackendHttp();
    this.io = new Server(this.backend.server, {
      cors: {
        origin: `${websocketConfig.protocol}://${websocketConfig.host}:${websocketConfig.port}`,
        methods: ["GET", "POST"],
      },
    });
    this.Dmxnet = new Dmxlib.dmxnet({
      log: {
        level: dmxConfig.logLevel,
      },
      oem: 0,
      sName: dmxConfig.name,
      lName: dmxConfig.desc,
      hosts: dmxConfig.hosts,
    });
    const sender1 = new Sender({
      ip: "192.168.1.224",
      subnet: 0,
      universe: 0,
      net: 0,
      port: 6454,
      base_refresh_interval: 10000,
    });
    const sender2 = new Sender({
      ip: "192.168.1.224",
      subnet: 0,
      universe: 1,
      net: 0,
      port: 6454,
      base_refresh_interval: 10000,
    });
    this.senders = [this.createSender(sender1), this.createSender(sender2)];

    this.io.on("connection", (socket) => {
      console.log("connection found");
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
      socket.on("set", ({ universe, channel, val }) => {
        if (val < 0 || val > 255) console.log("Value out of bounds");
        try {
          this.senders[universe].prepChannel(channel, val);
        } catch (err) {
          console.error(err);
        }
      });
      socket.on("transmit", () => {
        try {
          this.senders.forEach((sender) => sender.transmit());
        } catch (err) {
          console.error(err);
        }
      });
    });
  }

  createSender(sender) {
    return this.Dmxnet.newSender(sender.getConfig());
  }

  start() {
    this.backend.start();
  }
}
