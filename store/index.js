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
  },
  setCurrentRoom(state, room) {
    state.current_room = room;
  }
};

export const actions = {
  async InitUsersAndRooms({ commit }, _this) {
    try {
      // get users
      const { data } = await _this.$axios.get(
        `${process.env.baseUrl}/auth/user`
      );
      const filtered_data = data.filter(
        user => user._id != _this.$__getUser()._id
      );
      commit("setUsers", filtered_data);

      // TODOS: init rooms
    } catch (err) {
      console.log("Error:", err);
    }
  },
  alertOtherUser(context, user_id) {
    this.$socket.emit("new_user", user_id);
  },
  setCurrentRoom({ commit }, { is_group, room }) {
    // TODO: if is_groupt == true, just set the group
    // if not, filter and set the room
    // or create and set the room
    commit("setCurrentRoom", data);
  }
};
