<template>
  <div class="wrapper">
    <fixture />
  </div>
</template>
<script>
import Fixture from "../components/Show/Fixture.vue";

export default {
  name: "Show",
  components: { Fixture },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>
