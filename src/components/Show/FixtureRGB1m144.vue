<template>
  <div class="fixture">
    <h3>Small Test Fixture - 3 RGB LEDs in series.</h3>
    <div class="display" v-bind:style="{ background: fixtureColor }"></div>
    <div class="controls">
      <button @click="setColor({ r: 255, g: 0, b: 0 })">Red</button>
      <button @click="setColor({ r: 0, g: 255, b: 0 })">Green</button>
      <button @click="setColor({ r: 0, g: 0, b: 255 })">Blue</button>
      <button @click="setColor({ r: 0, g: 0, b: 0 })">Off</button>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";

export default {
  name: "FixtureRGB1m144",
  data() {
    return {
      fixtureColor: "rgb(50, 50, 50)",
      socket: io("http://127.0.0.1:6969", { forceNew: true }),
      fixtureChannels: {
        r: this.generateRange(0, 511, 3),
        g: this.generateRange(1, 511, 3),
        b: this.generateRange(2, 511, 3),
      },
    };
  },
  methods: {
    setColor({ r, g, b }) {
      this.fixtureColor = `rgb(${r}, ${g}, ${b})`;
      this.fixtureChannels.r.forEach((channel) => {
        this.socket.emit("set", { channel, val: r });
      });
      this.fixtureChannels.g.forEach((channel) => {
        this.socket.emit("set", { channel, val: g });
      });
      this.fixtureChannels.b.forEach((channel) => {
        this.socket.emit("set", { channel, val: b });
      });
      this.socket.emit("transmit");
    },
    generateRange(min, max, step) {
      let arr = [];
      for (let i = min; i <= max; i += step) {
        arr.push(i);
      }
      return arr;
    },
  },
};
</script>
<style scoped lang="scss">
.fixture {
  width: 100%;

  .display {
    height: 2rem;
    width: 90%;
    margin: auto;
  }
}
</style>
