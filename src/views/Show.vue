<template>
  <div class="wrapper">
    <router-link to="/show/addFixture">Add a fixture</router-link>
    <template v-for="(fixture, index) in getFixtures" :key="index">
      <LedBar
        v-if="fixture.type === 'LedBar'"
        :socket="getSocket"
        :numberOfColors="fixture.numberOfColors"
        :cmLengthOfFixture="fixture.lengthInCm"
        :ledsPerMeter="fixture.ledCount"
        :startChannel="fixture.startChannel"
        :universe="fixture.universe"
      />
      <LaserWorldCS1000RGBMk2
        v-if="fixture.type === 'LaserWorldCS1000RGBMk2'"
        :socket="getSocket"
        :startChannel="fixture.startChannel"
        :universe="fixture.universe"
      />
      <Fixture
        v-else
        :socket="getSocket"
        :numberOfColors="fixture.numberOfColors"
        :cmLengthOfFixture="fixture.lengthInCm"
        :ledsPerMeter="fixture.ledCount"
        :startChannel="fixture.startChannel"
        :universe="fixture.universe"
      />
    </template>
    <Network />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LedBar from "../components/Show/LedBar.vue";
import LaserWorldCS1000RGBMk2 from "../components/Show/LaserWorldCS1000RGBMk2.vue";
import Fixture from "../components/Show/Fixture.vue";
import Network from "../components/Show/Network.vue";

export default {
  name: "Show",
  components: { LedBar, LaserWorldCS1000RGBMk2, Fixture, Network },
  data() {
    return {
      dmxChannelMap: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
        13: {},
        14: {},
        15: {},
      },
    };
  },
  computed: {
    ...mapGetters("socket", ["getSocket"]),
    ...mapGetters("show", ["getFixtures"]),
  },
};
</script>
<style lang="scss">
.control {
  margin-bottom: 20px;
}
</style>
