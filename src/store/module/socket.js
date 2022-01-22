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
    setSocket({ commit }, socket) {
      commit("setSocket", socket);
    },
  },
  getters: {
    getSocket: (state) => state.socket,
  },
});

export default createSocketStoreModule;
