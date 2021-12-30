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
    // const sender1 = new Sender({
    //   ip: "192.168.1.224",
    //   subnet: 0,
    //   universe: 0,
    //   net: 0,
    //   port: 6454,
    //   base_refresh_interval: 10000,
    // });
    // console.debug(sender1);
    this.senders = [
      this.Dmxnet.newSender({
        ip: "192.168.1.224",
        subnet: 0,
        universe: 0,
        net: 0,
        port: 6454,
        base_refresh_interval: 10000,
      }),
      this.createSender({
        ip: "192.168.1.224",
        subnet: 0,
        universe: 1,
        net: 0,
        port: 6454,
        base_refresh_interval: 10000,
      }),
    ];

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

  createSender({ ip, subnet, universe, net, port, base_refresh_interval }) {
    return this.Dmxnet.newSender({
      ip,
      subnet,
      universe,
      net,
      port,
      base_refresh_interval,
    });
  }

  start() {
    this.backend.start();
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
