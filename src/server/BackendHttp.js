import http from "http";
import express from "express";
const port = 6969;

export default class BackendHttp {
  constructor() {
    const app = express();
    this.server = http.createServer(app);
  }

  start() {
    this.server.listen(port, () => {
      console.log(`listening on *:${port}`);
    });
  }
}
