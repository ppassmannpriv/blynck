const createMessageStoreModule = () => ({
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      const messages = state.messages;
      messages.push(message);
      state.messages = messages;
    },
  },
  actions: {
    setMessages({ commit }, messages) {
      commit("setMessages", messages);
    },
    addMessage({ commit }, message) {
      commit("addMessage", message);
    },
  },
  getters: {
    getMessages: (state) => state.messages,
  },
});

export default createMessageStoreModule;
