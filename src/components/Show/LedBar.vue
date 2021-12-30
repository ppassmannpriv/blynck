<template>
  <div class="fixture">
    <h3>Fixture - {{ numberOfLeds }} RGB LEDs in series.</h3>
    <div class="display" v-bind:style="{ background: fixtureColor }"></div>
    <div class="controls">
      <button @click="setColor({ r: 255, g: 0, b: 0 })">Red</button>
      <button @click="setColor({ r: 0, g: 255, b: 0 })">Green</button>
      <button @click="setColor({ r: 0, g: 0, b: 255 })">Blue</button>
      <button @click="setColor({ r: 0, g: 0, b: 0 })">Off</button>
      <RGB
        :rColor="rColor"
        :gColor="gColor"
        :bColor="bColor"
        @updateColor="changeFullColor"
      />
      <Speed
        :speed="speed"
        @updateSpeed="setSpeed"
        @start="flash"
        @stop="flash(true)"
      />
      <button @click="runColors">Run colors</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import RGB from "../../components/Control/RGB.vue";
import Speed from "../../components/Control/Speed.vue";

export default {
  name: "LedBar",
  components: {
    RGB,
    Speed,
  },
  props: {
    universe: {
      type: Number,
      required: true,
      default: () => 0,
    },
    startChannel: {
      type: Number,
      required: true,
      default: () => 0,
    },
    socket: {
      type: Object,
      required: true,
      default: () => {},
    },
    numberOfColors: {
      type: Number,
      required: true,
      default: () => 3,
    },
    ledsPerMeter: {
      type: Number,
      required: true,
      default: () => 60,
    },
    cmLengthOfFixture: {
      type: Number,
      required: true,
      default: () => 100,
    },
  },
  computed: {
    numberOfLeds() {
      return Math.ceil(this.ledsPerMeter * (this.cmLengthOfFixture / 100));
    },
    totalChannelCount() {
      return Math.ceil(this.numberOfLeds * this.numberOfColors);
    },
    fixtureChannels() {
      return {
        r: this.generateRange(0, this.totalChannelCount, 3),
        g: this.generateRange(1, this.totalChannelCount + 1, 3),
        b: this.generateRange(2, this.totalChannelCount + 2, 3),
      };
    },
    fixtureColor() {
      return `rgb(${this.rColor}, ${this.gColor}, ${this.bColor})`;
    },
    lastChannel() {
      let channelCount = 0;
      Object.values(this.fixtureChannels).forEach(
        (channel) => (channelCount = channelCount + channel.length)
      );
      return channelCount + this.startChannel;
    },
  },
  data() {
    return {
      anim: false,
      rColor: 50,
      gColor: 50,
      bColor: 50,
      speed: 120,
      runningFlash: {
        interval: null,
        color: null,
      },
    };
  },
  methods: {
    ...mapActions("fixture", ["setFixture"]),
    setColor({ r, g, b }) {
      this.rColor = r;
      this.gColor = g;
      this.bColor = b;
      this.fixtureChannels.r.forEach((channel) => {
        this.socket.emit("set", { universe: this.universe, channel, val: r });
      });
      this.fixtureChannels.g.forEach((channel) => {
        this.socket.emit("set", { universe: this.universe, channel, val: g });
      });
      this.fixtureChannels.b.forEach((channel) => {
        this.socket.emit("set", { universe: this.universe, channel, val: b });
      });
      this.socket.emit("transmit");
    },
    generateRange(min, max, step) {
      let arr = [];
      for (let i = min; i <= max; i += step) {
        arr.push(i + this.startChannel);
      }
      return arr;
    },
    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
    changeFullColor({ r, g, b }) {
      this.setColor({ r, g, b });
    },
    setSpeed(speed) {
      this.speed = speed;
      this.flash();
    },
    flash(stop = false) {
      clearInterval(this.runningFlash.interval);
      if (stop) {
        this.setColor(this.runningFlash.color);
        return;
      }
      if (this.speed === 0) return;
      const interval = Math.ceil(30000 / this.speed);
      const vm = this;
      const rgb = {
        r: this.rColor,
        g: this.gColor,
        b: this.bColor,
      };
      const off = {
        r: 0,
        g: 0,
        b: 0,
      };
      let r = true;
      this.runningFlash.color = rgb;
      this.runningFlash.interval = setInterval(() => {
        if (r) {
          r = false;
          vm.setColor(off);
        } else {
          r = true;
          vm.setColor(rgb);
        }
      }, interval);
    },
    async runColors() {
      this.anim = true;
      const rgb = {
        r: this.rColor,
        g: this.gColor,
        b: this.bColor,
      };
      let dir = { r: -1, g: 1, b: 1 };
      for (let i = 0; i < 50; i++) {
        if (rgb.r > 229) dir.r = -1;
        if (rgb.g > 229) dir.g = -1;
        if (rgb.b > 229) dir.b = -1;
        if (rgb.r < 30) dir.r = 1;
        if (rgb.g < 30) dir.g = 1;
        if (rgb.b < 30) dir.b = 1;
        rgb.r = rgb.r + 10 * dir.r;
        rgb.b = rgb.b + 20 * dir.b;
        rgb.g = rgb.g + 17 * dir.g;
        const interval = Math.ceil(60000 / this.speed);
        await this.delay(interval);
        this.setColor(rgb);
      }
      this.anim = false;
    },
  },
  created() {
    this.setFixture({
      id: 1,
      colors: this.fixtureColor,
    });
  },
};
</script>
<style scoped lang="scss">
.fixture {
  width: 100%;

  .display {
    height: 2rem;
    width: calc(90% - 2px);
    margin: auto;
    border: 1px solid black;
  }
}
</style>
