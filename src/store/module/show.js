/* eslint-disable no-param-reassign */

const createShowStoreModule = () => ({
  namespaced: true,
  state: {
    show: Object,
  },
  mutations: {
    setShow(state, show) {
      state.show = show;
    },
  },
  actions: {
    setState({ commit }, { show }) {
      commit("setShow", show);
    },
    setShow({ commit }, show) {
      commit("setShow", show);
    },
  },
  getters: {
    getShow: (state) => state.show,
  },
});

export default createShowStoreModule;
