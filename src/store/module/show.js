/* eslint-disable no-param-reassign */
import FixtureFactory from "../../model/FixtureFactory";

const createShowStoreModule = () => ({
  namespaced: true,
  state: {
    show: {
      name: null,
      fixtures: [],
    },
  },
  mutations: {
    setShow(state, show) {
      state.show = show;
    },
    addFixture(state, fixture) {
      const fixtureModel = FixtureFactory.create(fixture);
      state.show.fixtures.push(fixtureModel);
    },
  },
  actions: {
    setShow({ commit }, show) {
      commit("setShow", show);
    },
    addFixture({ commit }, fixture) {
      commit("addFixture", fixture);
    },
  },
  getters: {
    getShow: (state) => state.show,
    getFixtures: (state) => state.show.fixtures,
  },
});

export default createShowStoreModule;
