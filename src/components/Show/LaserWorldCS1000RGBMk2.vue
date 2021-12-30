<template>
  <div class="fixture">
    <h3>Laserworld CS1000 RGB MK2</h3>
    <div class="display"></div>
    <div class="controls">
      <Slider
        v-for="(channel, index) in channelMap"
        :key="index"
        :channel="channel.channel"
        :name="channel.name"
        :startValue="channel.value"
        @updateValue="updateChannel"
      />
      <Speed
        :speed="speed"
        @updateSpeed="setSpeed"
        @start="flash"
        @stop="flash(true)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Speed from "../../components/Control/Speed.vue";
import Slider from "../../components/Control/Slider.vue";

export default {
  name: "LaserWorldCS1000RGBMk2",
  components: { Speed, Slider },
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
  },
  data() {
    return {
      anim: false,
      speed: 120,
      channelMap: [
        {
          channel: 1,
          name: "Mode",
          value: 0,
        },
        {
          channel: 2,
          name: "Animation",
          value: 0,
        },
        {
          channel: 3,
          name: "Circular Motion",
          value: 0,
        },
        {
          channel: 4,
          name: "Y-Rotation",
          value: 0,
        },
        {
          channel: 5,
          name: "X-Rotation",
          value: 0,
        },
        {
          channel: 6,
          name: "Horizontal Movement",
          value: 0,
        },
        {
          channel: 7,
          name: "Vertical Movement",
          value: 0,
        },
        {
          channel: 8,
          name: "Zoom",
          value: 0,
        },
        {
          channel: 9,
          name: "Buildup",
          value: 0,
        },
        {
          channel: 10,
          name: "Dot/Strobe",
          value: 0,
        },
        {
          channel: 11,
          name: "Color",
          value: 0,
        },
      ],
      channels: {
        1: 0,
        2: 0,
        3: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
      },
    };
  },
  methods: {
    ...mapActions("fixture", ["setFixture"]),
    updateChannel({ channel, value }) {
      this.channels[channel] = value;
      this.socket.emit("triggerDevices", this.channels);
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
    setSpeed(speed) {
      this.speed = speed;
      this.flash();
    },
    flash() {},
  },
  created() {
    this.setFixture({
      id: 1337,
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
