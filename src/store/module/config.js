const createConfigStoreModule = () => ({
  namespaced: true,
  state: {
    senders: [],
    receivers: [],
    devices: [],
  },
  mutations: {
    setSenders(state, senders) {
      state.senders = senders;
    },
    addSender(state, sender) {
      const senders = state.senders;
      senders.push(sender);
      state.senders = senders;
    },
    setReceivers(state, receivers) {
      state.receivers = receivers;
    },
    addReceiver(state, receiver) {
      const receivers = state.receivers;
      receivers.push(receiver);
      state.receivers = receivers;
    },
    setDevices(state, devices) {
      state.devices = devices;
    },
    addDevice(state, device) {
      const devices = state.devices;
      devices.push(device);
      state.devices = devices;
    },
  },
  actions: {
    setSenders({ commit }, senders) {
      commit("setSenders", senders);
    },
    addSender({ commit }, sender) {
      commit("addSender", sender);
    },
    setReceivers({ commit }, receivers) {
      commit("setReceivers", receivers);
    },
    addReceiver({ commit }, receiver) {
      commit("addReceiver", receiver);
    },
    setDevices({ commit }, devices) {
      commit("setDevices", devices);
    },
    addDevice({ commit }, device) {
      commit("addDevice", device);
    },
  },
  getters: {
    getSenders: (state) => state.senders,
    getReceivers: (state) => state.receivers,
    getDevices: (state) => state.devices,
  },
});

export default createConfigStoreModule;
