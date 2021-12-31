<template>
  <div class="control slider">
    <template v-for="(option, index) in options" :key="index">
      <label :for="`${name}[${option.title}]`">{{ option.title }}: </label>
      <input
        :id="`${name}[${option.title}]`"
        :name="name"
        type="radio"
        :value="option.value"
        @change="sendValue"
      />
    </template>
  </div>
</template>
<script>
export default {
  name: "DmxSwitch",
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
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      value: this.startValue,
    };
  },
  methods: {
    sendValue(event) {
      this.value = parseInt(event.target.value, 10);
      this.$emit("updateValue", {
        channel: this.channel,
        value: this.value,
      });
    },
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
