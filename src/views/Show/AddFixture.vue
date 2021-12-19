<template>
  <div class="addFixture form">
    <h3>Add Fixture</h3>
    <div>
      <form @submit.prevent="saveFixture">
        <div class="form-group">
          <label for="type">Type: </label>
          <select v-model="fixture.type" name="type">
            <option
              v-for="(fixtureType, index) in getAvailableFixtureTypes"
              :key="index"
              :value="fixtureType"
            >
              {{ fixtureType }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="universe">Universe: </label>
          <input v-model="fixture.universe" type="number" name="universe" />
        </div>
        <div class="form-group" v-if="fixture.type === null">
          <label for="channels">Channels: </label>
          <input v-model="fixture.channels" type="number" name="channels" />
        </div>
        <div class="form-group">
          <label for="startChannel">Start Channel: </label>
          <input
            v-model="fixture.startChannel"
            type="number"
            name="startChannel"
          />
        </div>
        <LedBar
          v-if="fixture.type === 'LedBar'"
          @updateFixtureDetails="updateFixtureDetails"
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import LedBar from "../../components/Show/AddFixture/LedBar.vue";

export default {
  name: "AddFixture",
  components: { LedBar },
  data() {
    return {
      fixture: {
        universe: null,
        channels: null,
        startChannel: null,
        type: null,
      },
    };
  },
  computed: {
    ...mapGetters("fixture", ["getAvailableFixtureTypes"]),
  },
  methods: {
    ...mapActions("show", ["addFixture"]),
    updateFixtureDetails(details) {
      Object.assign(this.fixture, details);
    },
    saveFixture() {
      this.addFixture(this.fixture);
      // @TODO: well, error handling. dont navigate away on failure.
      this.$router.push("/show");
    },
  },
};
</script>
<style scoped lang="scss">
.form-group {
  label {
    min-width: 5rem;
  }
}
</style>
