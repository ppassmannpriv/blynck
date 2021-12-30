<template>
  <div class="fixture">
    <h3>Laserworld CS1000 RGB MK2</h3>
  </div>
</template>
<script>
export default {
  name: "LaserWorldCS1000RGBMk2",
  data() {
    return {
      fixtureDetails: {
        channels: 11,
        isLaser: true,
        isRgb: true,
      },
    };
  },
  methods: {
    updateFixtureDetails() {
      this.$emit("updateFixtureDetails", this.fixtureDetails);
    },
    generateRange(min, max, step) {
      let arr = [];
      for (let i = min; i <= max; i += step) {
        arr.push(i);
      }
      return arr;
    },
  },
  mounted() {
    this.updateFixtureDetails();
  },
};
</script>
<style scoped lang="scss">
.fixture {
  width: 100%;

  .display {
    height: 2rem;
    width: 90%;
    margin: auto;
  }
}
</style>
