<template>
  <div class="control slider">
    <label :for="name">{{ name }}: </label>
    <input
      min="0"
      max="255"
      :name="name"
      ref="value"
      type="number"
      :value="startValue"
      @change="sendValue"
    />
  </div>
</template>
<script>
export default {
  name: "Slider",
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
  methods: {
    sendValue() {
      this.$emit("updateValue", {
        channel: this.channel,
        value: parseInt(this.$refs["value"].value, 10),
      });
    },
  },
};
</script>
