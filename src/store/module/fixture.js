import Fixture from "../../model/Fixture";

const createFixtureStoreModule = () => ({
  namespaced: true,
  state: {
    fixture: Object,
    availableFixtureTypes: Fixture.listAvailableFixtureTypes(),
  },
  mutations: {
    setFixture(state, fixture) {
      state.fixture = fixture;
    },
  },
  actions: {
    setFixture({ commit }, fixture) {
      commit("setFixture", fixture);
    },
  },
  getters: {
    getFixture: (state) => state.fixture,
    getAvailableFixtureTypes: (state) => state.availableFixtureTypes,
  },
});

export default createFixtureStoreModule;
