<template>
  <div class="color control speed">
    <label for="speed">Speed: </label>
    <input
      min="0"
      max="255"
      name="speed"
      ref="speed"
      type="number"
      :value="speed"
      @change="sendValues"
    />
    <button @click="$emit('start')">Start</button>
    <button @click="$emit('stop')">Stop</button>
  </div>
</template>
<script>
export default {
  name: "Speed",
  props: {
    speed: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  methods: {
    sendValues() {
      this.$emit("updateSpeed", parseInt(this.$refs["speed"].value, 10));
    },
  },
};
</script>
