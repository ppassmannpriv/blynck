import BackendHttp from "./BackendHttp.js";
import Dmxnet from "./DmxServer/Dmxnet.js";
import SocketServer from "./DmxServer/SocketServer.js";
import ReceiverFactory from "./factory/ReceiverFactory.js";
import SenderFactory from "./factory/SenderFactory.js";
import { EnttecOpenDMXUSBDevice as DMXDevice } from "enttec-open-dmx-usb";

export default class DmxServer {
  constructor() {
    this.receivers = [];
    this.senders = [];
    this.backend = new BackendHttp();
    this.io = SocketServer.create(this.backend.server);
    this.Dmxnet = Dmxnet.create();

    try {
      this.receivers.push(
        this.addReceiver({
          subnet: 2,
          universe: 3,
          net: 0,
          subUniverse: 1,
        })
      );
      this.senders.push(
        this.addSender({
          ip: "192.168.1.224",
          subnet: 3,
          universe: 0,
          net: 0,
        })
      );
      this.senders.push(
        this.addSender({
          ip: "192.168.1.188",
          subnet: 2,
          universe: 3,
          net: 0,
        })
      );
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
      socket.on("addSender", (senderProps) => {
        try {
          this.senders.push(this.addSender(senderProps));
          console.log("Added Sender!");
          console.debug(this.senders[this.senders.length - 1]);
        } catch (error) {
          console.error(error);
        }
      });
      socket.on("addReceiver", (receivedProps) => {
        try {
          this.receivers.push(this.addReceiver(receivedProps));
          console.log("Added Receiver!");
          console.debug(this.receivers[this.receivers.length - 1]);
        } catch (error) {
          console.error(error);
        }
      });

      this.receivers.forEach((receiver) => {
        receiver.on("data", (data) => {
          socket.emit("receivedDmx", data);
        });
      });
    });
  }

  addReceiver(props) {
    const receiverModel = ReceiverFactory.create(props);
    return this.createReceiver(receiverModel);
  }

  createReceiver(receiverModel) {
    return this.Dmxnet.newReceiver(receiverModel.getConfig());
  }

  addSender(props) {
    const senderModel = SenderFactory.create(props);
    return this.createSender(senderModel);
  }

  createSender(senderModel) {
    return this.Dmxnet.newSender(senderModel.getConfig());
  }

  start() {
    this.backend.start();
  }

  async connectToDevices() {
    try {
      const devices = await DMXDevice.listDevices();
      if (devices.length > 0) {
        const device = new DMXDevice(await DMXDevice.getFirstAvailableDevice());
        this.devices.push(device);
      } else {
        console.log("No DMX USB Devices found!");
      }
    } catch (err) {
      console.error(err);
    }

    return this.devices;
  }
}
