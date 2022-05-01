<template>
  <div class="wrapper">
    <h3>Sender</h3>
    <div class="config">
      <form @submit.prevent="saveSender">
        <div class="control input">
          <label for="ip">IP: </label>
          <input type="text" name="ip" id="ip" v-model="sender.ip" />
        </div>
        <div class="control input">
          <label for="subnet">Subnet: </label>
          <input
            type="number"
            name="subnet"
            id="subnet"
            v-model="sender.subnet"
          />
        </div>
        <div class="control input">
          <label for="universe">Universe: </label>
          <input
            type="number"
            name="universe"
            id="universe"
            v-model="sender.universe"
          />
        </div>
        <div class="control input">
          <label for="net">Net: </label>
          <input type="number" name="net" id="net" v-model="sender.net" />
        </div>
        <div class="control input">
          <label for="channel">Starting Channel: </label>
          <input
            type="number"
            name="channel"
            id="channel"
            v-model="sender.channel"
          />
        </div>
        <div class="control buttons">
          <input type="submit" value="Save" />
          <button @click.prevent="clear">Clear</button>
          <button @click.prevent="abort">Abort</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { uuid } from "vue-uuid";
export default {
  name: "Sender",
  props: {
    storedSender: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: null,
          ip: null,
          subnet: null,
          universe: null,
          net: null,
          channel: null,
        };
      },
    },
  },
  computed: {},
  data() {
    return {
      sender: {
        id: uuid.v1(),
        ip: null,
        subnet: null,
        universe: null,
        net: null,
        channel: null,
      },
    };
  },
  methods: {
    saveSender() {
      this.$emit("save", this.sender);
    },
    abort() {
      this.$emit("abort");
    },
    clear() {
      this.sender = {
        ip: null,
        subnet: null,
        universe: null,
        net: null,
        channel: null,
      };
    },
  },
  created() {
    if (this.storedSender) {
      this.sender = this.storedSender;
      if (this.storedSender.id === null) {
        this.sender.id = uuid.v1();
      }
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 25%;
}
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
.buttons input,
.buttons button {
  margin-left: 10%;
  width: calc(80% / 3);
  &:first-child {
    margin-left: 0;
  }
}
</style>
