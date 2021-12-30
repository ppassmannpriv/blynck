import DmxServer from "./DmxServer.js";

const test = new DmxServer();
(async () => {
  await test.connectToDevices();
  test.start();
})();
