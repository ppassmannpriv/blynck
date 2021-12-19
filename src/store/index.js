import { createStore } from "vuex";
import createFixtureStoreModule from "./module/fixture.js";
import createSocketStoreModule from "./module/socket.js";
import createShowStoreModule from "./module/show.js";
import createMessageStoreModule from "./module/message.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    show: createShowStoreModule(),
    fixture: createFixtureStoreModule(),
    socket: createSocketStoreModule(),
    message: createMessageStoreModule(),
  },
});
