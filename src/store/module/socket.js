/* eslint-disable no-param-reassign */

const createSocketStoreModule = () => ({
  namespaced: true,
  state: {
    socket: Object,
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket;
    },
  },
  actions: {
    setState({ commit }, { socket }) {
      commit("setSocket", socket);
    },
    setSocket({ commit }, socket) {
      commit("setSocket", socket);
    },
  },
  getters: {
    getSocket: (state) => state.socket,
  },
});

export default createSocketStoreModule;
