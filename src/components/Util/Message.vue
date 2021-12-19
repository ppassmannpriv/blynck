<template>
  <div class="message">
    <strong>{{ message }}</strong>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    message: {
      type: String,
      required: true,
      default: () => {},
    },
  },
};
</script>
