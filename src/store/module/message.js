const createMessageStoreModule = () => ({
  namespaced: true,
  state: {
    messages: Array,
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
  },
  actions: {
    setState({ commit }, { messages }) {
      commit("setMessages", messages);
    },
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
