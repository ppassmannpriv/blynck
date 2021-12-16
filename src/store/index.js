import createFixtureStoreModule from "./module/fixture.js";
import { createStore } from "vuex";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    fixture: createFixtureStoreModule(),
  },
});
