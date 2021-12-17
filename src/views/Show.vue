<template>
  <div class="wrapper">
    <Fixture
      :socket="socket"
      :numberOfColors="3"
      :cmLengthOfFixture="100"
      :ledsPerMeter="60"
      :startChannel="0"
      :universe="0"
    />
    <Fixture
      :socket="socket"
      :numberOfColors="3"
      :cmLengthOfFixture="50"
      :ledsPerMeter="60"
      :startChannel="184"
      :universe="0"
    />
    <Fixture
      :socket="socket"
      :numberOfColors="3"
      :cmLengthOfFixture="200"
      :ledsPerMeter="60"
      :startChannel="0"
      :universe="1"
    />
  </div>
</template>
<script>
import io from "socket.io-client";
import Fixture from "../components/Show/Fixture.vue";

export default {
  name: "Show",
  components: { Fixture },
  data() {
    return {
      socket: io("http://127.0.0.1:6969", { forceNew: true }),
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
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>
