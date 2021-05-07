export const state = () => ({
  current_room: null,
  new_user_id: "",
  rooms: [],
  users: []
});

export const mutations = {
  SOCKET_addRoom(store, data) {
    console.log(data);
  },
  SOCKET_new_user(store, id) {
    store.new_user_id = id;
  },
  setRooms(store, rooms) {
    store.rooms = rooms;
  },
  setUsers(store, users) {
    store.users = users;
  }
};

export const actions = {
  InitUsersAndRooms({ commit }, _this) {
    _this.$axios
      .get(`${process.env.baseUrl}/auth/user`)
      .then(({ data }) => {
        const filtered_data = data.filter(
          user => user._id != _this.$__getUser()._id
        );
        commit("setUsers", filtered_data);
      })
      .catch(err => console.log("Error:", err));
  },
  alertOtherUser({ dispatch }, user_id) {
    this.$socket.emit("new_user", user_id);
  }
};
