import { Server } from "socket.io";
import websocketConfig from "../../constants/websocket.js";

export default class SocketServer {
  constructor() {}

  static create(backendServer) {
    return new Server(backendServer, {
      cors: {
        origin: `${websocketConfig.protocol}://${websocketConfig.host}:${websocketConfig.port}`,
        methods: ["GET", "POST"],
      },
    });
  }
}
