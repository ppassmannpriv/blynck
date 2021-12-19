const Dmxlib = require("dmxnet");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const Dmxnet = new Dmxlib.dmxnet({
  log: {
    level: "debug",
  },
  oem: 0,
  sName: "Test",
  lName: "Longtest",
  hosts: ["127.0.0.1"],
});

const senders = [
  Dmxnet.newSender({
    ip: "192.168.1.224", //IP to send to, default 255.255.255.255
    subnet: 0, //Destination subnet, default 0
    universe: 0, //Destination universe, default 0
    net: 0, //Destination net, default 0
    port: 6454, //Destination UDP Port, default 6454
    base_refresh_interval: 10000, // Default interval for sending unchanged ArtDmx
  }),
  Dmxnet.newSender({
    ip: "192.168.1.224", //IP to send to, default 255.255.255.255
    subnet: 0, //Destination subnet, default 0
    universe: 1, //Destination universe, default 0
    net: 0, //Destination net, default 0
    port: 6454, //Destination UDP Port, default 6454
    base_refresh_interval: 10000, // Default interval for sending unchanged ArtDmx
  }),
];

io.on("connection", (socket) => {
  console.log("connection found");
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.on("set", ({ universe, channel, val }) => {
    if (val < 0 || val > 255) console.log("Value out of bounds");
    try {
      senders[universe].prepChannel(channel, val);
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("transmit", () => {
    try {
      senders.forEach((sender) => sender.transmit());
    } catch (err) {
      console.error(err);
    }
  });
});

server.listen(6969, () => {
  console.log("listening on *:6969");
});
