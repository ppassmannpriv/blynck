import { Server } from "socket.io";
import websocketConfig from "../../constants/websocket.js";

export default class SocketServer {
  constructor() {}

  static create() {
    return new Server(this.backend.server, {
      cors: {
        origin: `${websocketConfig.protocol}://${websocketConfig.host}:${websocketConfig.port}`,
        methods: ["GET", "POST"],
      },
    });
  }
}
