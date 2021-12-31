<template>
  <div class="fixture">
    <h3>Laserworld CS1000 RGB MK2</h3>
    <div class="controls">
      <DmxSwitch
        name="Mode"
        :channel="1"
        :startValue="channelMap[0].value"
        :options="[
          {
            title: 'Off',
            value: 0,
          },
          {
            title: 'Sound',
            value: 70,
          },
          {
            title: 'Auto',
            value: 180,
          },
          {
            title: 'DMX',
            value: 255,
          },
        ]"
        @updateValue="updateChannel"
      />
      <DmxSlider
        v-for="(channel, index) in channelMap.filter(
          (cM) => cM.type === 'Slider'
        )"
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
import DmxSlider from "../Control/DmxSlider.vue";
import DmxSwitch from "../Control/DmxSwitch.vue";

export default {
  name: "LaserWorldCS1000RGBMk2",
  components: { Speed, DmxSlider, DmxSwitch },
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
          type: "Switch",
        },
        {
          channel: 2,
          name: "Animation",
          value: 0,
          type: "Slider",
        },
        {
          channel: 3,
          name: "Circular Motion",
          value: 0,
          type: "Slider",
        },
        {
          channel: 4,
          name: "Y-Rotation",
          value: 0,
          type: "Slider",
        },
        {
          channel: 5,
          name: "X-Rotation",
          value: 0,
          type: "Slider",
        },
        {
          channel: 6,
          name: "Horizontal Movement",
          value: 0,
          type: "Slider",
        },
        {
          channel: 7,
          name: "Vertical Movement",
          value: 0,
          type: "Slider",
        },
        {
          channel: 8,
          name: "Zoom",
          value: 0,
          type: "Slider",
        },
        {
          channel: 9,
          name: "Buildup",
          value: 0,
          type: "Slider",
        },
        {
          channel: 10,
          name: "Dot/Strobe",
          value: 0,
          type: "Slider",
        },
        {
          channel: 11,
          name: "Color",
          value: 0,
          type: "Slider",
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
      runningFlash: {
        interval: null,
        color: null,
      },
    };
  },
  methods: {
    ...mapActions("fixture", ["setFixture"]),
    updateChannel({ channel, value }) {
      this.channels[channel] = value;
      this.channelMap.find(
        (mappedChannel) => mappedChannel.channel === channel
      ).value = value;
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
    flash(stop = false) {
      clearInterval(this.runningFlash.interval);
      if (stop) {
        return;
      }
      if (this.speed === 0) return;
      const interval = Math.ceil(30000 / this.speed);
      const vm = this;
      let r = true;
      let i = 0;
      this.runningFlash.interval = setInterval(() => {
        if (r) {
          if (i > 240) r = false;
          i = i + 10;
        } else {
          if (i < 20) r = true;
          i = i - 10;
        }
        vm.updateChannel({ channel: 1, value: 255 });
        vm.updateChannel({ channel: 11, value: i });
      }, interval);
    },
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
