<template>
  <div class="control-display">
    <label :for="name">{{ name }}: </label>
    <ul>
      <li v-for="(value, channel) in channels" :key="channel">{{ value }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "DmxDisplay",
  props: {
    name: {
      type: String,
      default: () => "",
      required: true,
    },
    channels: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>
<style scoped>
.control-display {
  height: auto;
}
li {
  list-style: none;
  display: inline-flex;
  width: 3rem;
  text-align: center;
}
</style>
