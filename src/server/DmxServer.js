import Dmxlib from "dmxnet";
import BackendHttp from "./BackendHttp.js";
import { Server } from "socket.io";
import ReceiverFactory from "./factory/ReceiverFactory.js";
import SenderFactory from "./factory/SenderFactory.js";
import websocketConfig from "../constants/websocket.js";
import dmxConfig from "../constants/dmx.js";
import { EnttecOpenDMXUSBDevice as DMXDevice } from "enttec-open-dmx-usb";

export default class DmxServer {
  constructor() {
    this.receivers = [];
    this.senders = [];
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
    try {
      const receiver1 = ReceiverFactory.create({
        subnet: 2,
        universe: 3,
        net: 0,
        subUniverse: 1,
      });
      const sender1 = SenderFactory.create({
        ip: "192.168.1.224",
        subnet: 3,
        universe: 0,
        net: 0,
      });
      const sender2 = SenderFactory.create({
        ip: "192.168.1.188",
        subnet: 2,
        universe: 3,
        net: 0,
      });
      this.receivers.push(this.createReceiver(receiver1));
      this.senders.push(this.createSender(sender1));
      this.senders.push(this.createSender(sender2));
    } catch (error) {
      console.error(error);
    }
    this.devices = [];

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
      socket.on("triggerDevices", (anim) => {
        try {
          this.devices.forEach((device) => {
            if (device.shouldBeSending) {
              device.setChannels(anim);
            }
          });
        } catch (err) {
          console.error(err);
        }
      });

      this.receivers.forEach((receiver) => {
        receiver.on("data", (data) => {
          socket.emit("receivedDmx", data);
        });
      });
    });
  }

  createReceiver(receiver) {
    return this.Dmxnet.newReceiver(receiver.getConfig());
  }

  createSender(sender) {
    return this.Dmxnet.newSender(sender.getConfig());
  }

  start() {
    this.backend.start();
  }

  async connectToDevices() {
    try {
      const device = new DMXDevice(await DMXDevice.getFirstAvailableDevice());
      this.devices.push(device);
    } catch (err) {
      console.error(err);
    }

    return this.devices;
  }
}
