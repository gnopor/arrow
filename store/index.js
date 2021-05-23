export const state = () => ({
  current_room: null,
  new_user_id: null,
  new_error: null,
  user_writing_alert: null,
  new_message_alert: {},
  rooms: [],
  users: []
});

export const mutations = {
  SOCKET_new_room(state, room) {
    state.rooms = [...state.rooms, room];
  },
  SOCKET_new_user(state, id) {
    state.new_user_id = id;
  },
  SOCKET_new_writing(state, data) {
    state.user_writing_alert = data;
  },
  setNewError(state, error) {
    state.new_error = error;
  },
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  SOCKET_new_message(state, { message, id_room }) {
    const index = state.rooms.findIndex(room => room._id == id_room);
    state.rooms[index].messages.push(message);
  },
  setUsers(state, users) {
    state.users = users;
  },
  setCurrentRoom(state, room) {
    state.current_room = room;
  },
  setNewMessageAlert(state, alert) {
    state.new_message_alert = alert;
  }
};

export const actions = {
  SOCKET_set_new_error({ commit }, error) {
    commit("setNewError", error);
  },
  SOCKET_new_message_alert({ commit, state }, { id_sender, id_room }) {
    const room = state.rooms.find(room => room._id == id_room);
    const alert = { room, id_sender };
    commit("setNewMessageAlert", alert);
  },
  async InitUsersAndRooms({ commit }, _this) {
    try {
      // get users
      const users = await _this.$axios.get(`${process.env.baseUrl}/auth/user`);
      commit("setUsers", users.data);

      // get rooms
      const rooms = await _this.$axios.get(`${process.env.baseUrl}/core/room`);
      commit("setRooms", rooms.data);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  },
  alertOtherUser(_, user_id) {
    this.$socket.emit("new_user", user_id);
  },
  setCurrentRoom({ commit, dispatch, state }, { data, user }) {
    // handle group
    if (data.is_group) {
      return commit("setCurrentRoom", data);
    }

    // handle single chat
    const current_room = state.rooms.find(
      room =>
        !room.is_group &&
        ((room.users[0] == data._id && room.users[1] == user._id) ||
          (room.users[1] == data._id && room.users[0] == user._id))
    );

    if (current_room && current_room._id) {
      commit("setCurrentRoom", current_room);
    } else {
      dispatch("createRoom", {
        id_admin: user._id,
        users: [user._id, data._id],
        is_group: false
      });
    }
  },
  createRoom(_, data) {
    this.$socket.emit("new_room", data);
  },
  createWritingAlert({ state, commit }, { user, is_writing }) {
    let alert = null;
    if (is_writing) {
      alert = {
        user,
        id_room: state.current_room._id
      };
    }

    this.$socket.emit("new_writing", alert);
  },
  addNewMessage(_, data) {
    this.$socket.emit("new_message", data);
  }
  // getUser({ state }, id) {
  //   return state.users.find(user => user._id == id);
  // }
};
