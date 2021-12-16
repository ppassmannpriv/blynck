/* eslint-disable no-param-reassign */

const createFixtureStoreModule = () => ({
  namespaced: true,
  state: {
    fixture: Object,
  },
  mutations: {
    setFixture(state, fixture) {
      state.fixture = fixture;
    },
  },
  actions: {
    setState({ commit }, { fixture }) {
      commit("setFixture", fixture);
    },
    setFixture({ commit }, fixture) {
      commit("setFixture", fixture);
    },
  },
  getters: {
    getFixture: (state) => state.fixture,
  },
});

export default createFixtureStoreModule;
