<template>
  <div class="wrapper">
    <Fixture :numberOfColors="3" :cmLengthOfFixture="100" :ledsPerMeter="60" />
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
