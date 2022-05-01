<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/show">Show</router-link> |
    <router-link to="/config">Config</router-link>
  </div>
  <Message
    v-for="(message, index) in getMessages"
    :key="index"
    :message="message"
  />
  <router-view />
</template>

<script>
import io from "socket.io-client";
import { mapActions, mapGetters } from "vuex";
import Message from "./components/Util/Message.vue";

export default {
  name: "Blynck",
  components: { Message },
  computed: {
    ...mapGetters("message", ["getMessages"]),
  },
  methods: {
    ...mapActions("socket", ["setSocket"]),
    ...mapActions("message", ["addMessage"]),
  },
  created() {
    try {
      this.setSocket(io("http://127.0.0.1:6969", { forceNew: true }));
    } catch (err) {
      this.addMessage(err);
    }
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
