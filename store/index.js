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
  alertOtherUser(_, user_id) {
    this.$socket.emit("new_user", user_id);
  },
  setCurrentRoom({ commit, dispatch, state }, { data, _this }) {
    // handle group
    if (data.is_group) {
      return commit("setCurrentRoom", data);
    }

    // handle single chat
    const user = _this.$__getUser();
    const current_room = state.rooms.find(
      room =>
        !room.is_group &&
        ((room.users[0] == data._id && room.users[1] == user._id) ||
          (room.users[1] == data._id && room.users[0] == user._id))
    );

    (current_room && current_room._id && commit("setCurrenRoom", data)) ||
      dispatch("createRoom", {
        id_admin: user._id,
        users: [user._id, data._id],
        is_group: false
      });
  },
  createRoom(_, data) {
    this.$socket.emit("new_room", data);
  }
};
