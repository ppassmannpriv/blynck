<template>
  <div class="addFixture form">
    <h3>Add Fixture</h3>
    <div>
      <form @submit.prevent="saveFixture">
        <label for="universe">Universe: </label>
        <input v-model="fixture.universe" type="number" name="universe" />
        <label for="channels">Channels: </label>
        <input v-model="fixture.channels" type="number" name="channels" />
        <label for="startChannel">Start Channel: </label>
        <input
          v-model="fixture.startChannel"
          type="number"
          name="startChannel"
        />
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
        <input type="submit" value="Save" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddFixture",
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
    saveFixture() {
      this.addFixture(this.fixture);
    },
  },
};
</script>
