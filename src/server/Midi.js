import midi from "midi";

const input = new midi.input();

console.log(input.getPortCount());

input.on("message", (deltaTime, message) => {
  console.log(`m: ${message} d: ${deltaTime}`);
});

input.openPort(0);

input.ignoreTypes(true, false, true);
