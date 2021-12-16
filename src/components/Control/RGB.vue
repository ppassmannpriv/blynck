<template>
  <div class="color control rgb">
    <label for="r">Red: </label>
    <input
      min="0"
      max="255"
      name="r"
      ref="r"
      type="number"
      :value="rColor"
      @change="sendValues"
    />
    <label for="g">Green: </label>
    <input
      min="0"
      max="255"
      name="g"
      ref="g"
      type="number"
      :value="gColor"
      @change="sendValues"
    />
    <label for="b">Blue: </label>
    <input
      min="0"
      max="255"
      name="b"
      ref="b"
      type="number"
      :value="bColor"
      @change="sendValues"
    />
  </div>
</template>
<script>
export default {
  name: "RGB",
  props: {
    rColor: {
      type: Number,
      required: true,
      default: () => 0,
    },
    gColor: {
      type: Number,
      required: true,
      default: () => 0,
    },
    bColor: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  methods: {
    sendValues() {
      let colors = {};
      Object.keys(this.$refs).forEach((key) => {
        colors[key] = parseInt(this.$refs[key].value, 10);
      });
      this.$emit("updateColor", colors);
    },
  },
};
</script>
