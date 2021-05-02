export const state = () => ({
  current_room: {},
  rooms: [],
  users: []
});

export const mutations = {
  SOCKET_addRoom(store, data) {
    console.log(data);
  },
  setRooms(store, rooms) {
    store.rooms = rooms;
  },
  setUsers(store, users) {
    store.users = users;
  }
};

export const actions = {
  SOCKET_joinRoom({ commit }, data) {
    console.log("from store", data);
  },
  InitUsersAndRooms({ commit }, _this) {
    _this.$axios
      .get(`${process.env.baseUrl}/auth/user`)
      .then(({ data }) => {
        const filtered_data = data.filter(
          user => user._id != _this.$__getUser()._id
        );
        commit("setUsers", filtered_data);
      })
      .catch(err => {});
  }
};
