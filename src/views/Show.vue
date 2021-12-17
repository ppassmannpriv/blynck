<template>
  <div class="wrapper">
    <Fixture
      :socket="getSocket"
      :numberOfColors="3"
      :cmLengthOfFixture="283"
      :ledsPerMeter="60"
      :startChannel="0"
      :universe="0"
    />
    <Fixture
      :socket="getSocket"
      :numberOfColors="3"
      :cmLengthOfFixture="50"
      :ledsPerMeter="60"
      :startChannel="184"
      :universe="2"
    />
    <Fixture
      :socket="getSocket"
      :numberOfColors="3"
      :cmLengthOfFixture="200"
      :ledsPerMeter="60"
      :startChannel="0"
      :universe="1"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Fixture from "../components/Show/Fixture.vue";

export default {
  name: "Show",
  components: { Fixture },
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
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>
