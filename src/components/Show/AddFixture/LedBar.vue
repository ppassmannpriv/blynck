<template>
  <div class="form-component fixture">
    <div class="form-group">
      <label for="lengthInCm">Length in CM: </label>
      <input
        @change.prevent="updateFixtureDetails"
        v-model="fixtureDetails.lengthInCm"
        type="number"
        name="lengthInCm"
      />
    </div>
    <div class="form-group">
      <label for="ledCount">LED Count: </label>
      <input
        @change.prevent="updateFixtureDetails"
        v-model="fixtureDetails.ledCount"
        type="number"
        name="ledCount"
      />
    </div>
    <div class="form-group">
      <label for="isRgb">RGB: </label>
      <select
        @change.prevent="updateFixtureDetails"
        v-model="fixtureDetails.isRgb"
        name="isRgb"
      >
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: "LedBar",
  data() {
    return {
      fixtureDetails: {
        lengthInCm: null,
        ledCount: null,
        isRgb: true,
      },
    };
  },
  methods: {
    updateFixtureDetails() {
      this.$emit("updateFixtureDetails", this.fixtureDetails);
    },
  },
};
</script>
