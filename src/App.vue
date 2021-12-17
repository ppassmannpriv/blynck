<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/show">Show</router-link>
  </div>
  <router-view />
</template>

<script>
import io from "socket.io-client";
import { mapActions } from "vuex";

export default {
  name: "Blynck",
  methods: {
    ...mapActions("socket", ["setSocket"]),
  },
  created() {
    this.setSocket(io("http://127.0.0.1:6969", { forceNew: true }));
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
