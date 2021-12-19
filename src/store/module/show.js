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
      console.log(fixture);
      const fixtureModel = FixtureFactory.create(fixture);
      console.log(fixtureModel);
      state.show.fixtures.push(fixtureModel);
    },
  },
  actions: {
    setState({ commit }, { show }) {
      commit("setShow", show);
    },
    setShow({ commit }, show) {
      commit("setShow", show);
    },
    addFixture({ commit }, fixture) {
      commit("addFixture", fixture);
    },
  },
  getters: {
    getShow: (state) => state.show,
  },
});

export default createShowStoreModule;
