export const state = () => ({});

export const mutations = {
  SOCKET_test_mutation(store, data) {
    console.log(data);
  }
};

export const actions = {
  SOCKET_client_test({ commit }, data) {
    console.log("******************8*******");
    console.log("from store", data);
  },
  test({ commit }) {
    this.$socket.emit("test", "hello from localhost:3000 by gnop");
  }
};
