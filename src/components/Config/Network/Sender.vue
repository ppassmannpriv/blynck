<template>
  <div class="sender-wrapper">
    <h3 v-if="!isNew">Sender {{ sender.id }}</h3>
    <h3 v-else>New Sender</h3>
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
          <button @click.prevent="clear" v-if="isNew">Clear</button>
          <button @click.prevent="remove" v-if="isNew === false">Delete</button>
          <button @click.prevent="abort" v-if="isNew">Abort</button>
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
    isNew: {
      type: Boolean,
      required: false,
      default: () => false,
    },
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
      this.clear();
    },
    abort() {
      if (this.isNew) {
        this.$emit("abort");
      }
    },
    remove() {
      if (this.isNew === false) {
        this.$emit("remove");
      }
    },
    clear() {
      if (this.isNew) {
        this.sender = {
          id: null,
          ip: null,
          subnet: null,
          universe: null,
          net: null,
          channel: null,
        };
      }
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
};
</script>
<style lang="scss" scoped>
.sender-wrapper {
  width: 100%;
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
