<template>
  <div class="wrapper">
    <h2>Network Config</h2>
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
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Network",
  props: {},
  computed: {},
  data() {
    return {
      sender: {
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
      console.log(this.sender);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="css" scoped>
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
.buttons input {
  margin-left: 40%;
}
</style>
