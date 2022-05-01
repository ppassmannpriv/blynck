<template>
  <div class="component-wrapper">
    <h2>Configuration/Network</h2>
    <div>
      <p>Cool, network conf.</p>
      <div class="col senders">
        <button @click.prevent="createSender">Create Sender</button>
        <Sender
          v-show="creatingSender"
          :isNew="creatingSender"
          @abort="abortCreateSender"
          @save="saveSender"
        />
        <Sender
          v-for="(sender, index) in getSenders"
          :key="index"
          :storedSender="sender"
          @save="saveSender"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Sender from "./Network/Sender.vue";

export default {
  name: "Network",
  components: { Sender },
  computed: {
    ...mapGetters("config", ["getSenders"]),
    ...mapGetters("config", ["getReceivers"]),
    ...mapGetters("config", ["getDevices"]),
  },
  data() {
    return {
      creatingSender: false,
    };
  },
  methods: {
    ...mapActions("config", ["addSender"]),
    createSender() {
      this.creatingSender = true;
    },
    abortCreateSender() {
      this.creatingSender = false;
    },
    saveSender(sender) {
      this.addSender(sender);
    },
  },
};
</script>
<style lang="css" scoped>
.control {
  width: 100%;
  display: flex;
}
label {
  width: 40%;
}
input {
  width: 60%;
}
.buttons input {
  margin-left: 40%;
}
</style>
