import { createStore } from "vuex";
import createFixtureStoreModule from "./module/fixture.js";
import createSocketStoreModule from "./module/socket.js";
import createShowStoreModule from "./module/show.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    show: createShowStoreModule(),
    fixture: createFixtureStoreModule(),
    socket: createSocketStoreModule(),
  },
});
