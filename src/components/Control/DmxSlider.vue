<template>
  <div class="control slider">
    <label :for="name">{{ name }}: </label>
    <input
      min="0"
      max="255"
      :name="name"
      type="number"
      :value="value"
      @change="sendValue"
    />
    <Slider @update="sendValue" :min="0" :max="255" v-model="value" />
  </div>
</template>
<script>
import Slider from "@vueform/slider";

export default {
  name: "DmxSlider",
  components: { Slider },
  props: {
    name: {
      type: String,
      required: true,
      default: () => "",
    },
    startValue: {
      type: Number,
      required: true,
      default: () => 0,
    },
    channel: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data() {
    return {
      value: this.startValue,
    };
  },
  methods: {
    sendValue() {
      this.$emit("updateValue", {
        channel: this.channel,
        value: parseInt(this.value, 10),
      });
    },
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
