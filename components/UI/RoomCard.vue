<template>
  <article :ref="room._id" class="room_card p-2" @click="handleFocus">
    <!-- avatar  -->
    <figure class="avatar">
      <img :src="getAvatarURI" alt="room title avatar" />
    </figure>

    <!-- name and creation date  -->
    <div class="infos mx-2">
      <span class="room_username">@{{ room.username || room.title }}</span>
      <span class="room_date">{{
        $__formatDate(room._date_creation || room.date_creation)
      }}</span>
    </div>

    <!-- notificatoins  -->
    <!-- bell notification   -->
    <div v-if="show_bell" class="bell text-accent">
      <client-only>
        <mdicon name="bell" />
      </client-only>
    </div>

    <!-- user connected bell  -->
    <i v-if="new_user_id == room._id" class="bg-accent connected" />

    <!-- modal  -->

    <AddUserModal
      v-if="show_join_group_modal"
      @close="show_join_group_modal = false"
      @join="handleJoinGroup"
    />
  </article>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AddUserModal from "@/components/UI/AddUserModal";
export default {
  name: "RoomCard",
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  components: {
    AddUserModal,
  },
  data: () => ({
    show_bell: false,
    show_join_group_modal: false,
    current_user: {},
  }),
  watch: {
    new_message_alert() {
      const alert = this.new_message_alert;

      if (alert.room.is_group) {
        this.show_bell =
          alert.room._id == this.room._id &&
          alert.room.users.includes(this.current_user._id);
      }
      if (!alert.room.is_group) {
        const users = alert.room.users;
        this.show_bell =
          (users[0] == this.room._id && users[1] == this.current_user._id) ||
          (users[1] == this.room._id && users[0] == this.current_user._id);
      }
    },
    show_bell() {
      if (this.show_bell) {
        const audio = new Audio("/ringtones/notification.mp3");
        audio.play();
      }
    },
  },
  mounted() {
    this.current_user = this.$__getUser();
  },
  methods: {
    ...mapActions(["setCurrentRoom", "joinGroup"]),
    handleFocus() {
      // hide bell
      this.show_bell = false;

      if (
        this.room.is_group &&
        !this.room.users.includes(this.current_user._id)
      ) {
        this.show_join_group_modal = true;
        return;
      }

      this.getFocus();
      this.setCurrentRoom({ data: { ...this.room }, user: this.current_user });
    },
    getFocus() {
      const room = this.$refs[this.room._id];
      document
        .querySelectorAll(".room_card[data-active]")
        .forEach((room) => room.removeAttribute("data-active"));
      room.setAttribute("data-active", true);
    },
    handleJoinGroup() {
      this.show_join_group_modal = false;
      this.joinGroup({
        id_room: this.room._id,
        id_user: this.current_user._id,
      });
    },
  },
  computed: {
    ...mapState(["new_user_id", "new_message_alert"]),
    getAvatarURI() {
      return `${process.env.baseUrl}${this.room.avatar}`;
    },
  },
};
</script>

<style scoped>
.room_card {
  position: relative;
  display: flex;
  cursor: pointer;
}

.room_card::before {
  position: absolute;
  top: 0;
  content: "";
  width: 95%;
  border: 1px solid var(--base);
  border-width: 0 0 1px 0;
  margin: auto;
}

/* --> active user  */
.room_card[data-active] {
  background: var(--base);
  color: var(--lg);
}

/* --> avatar  */
/* .room_card .avatar  */
.room_card .avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0;
  max-height: 4em;
  max-width: 4em;
  overflow: hidden;
}

.room_card .avatar img {
  border-radius: inherit;
  height: 4em;
  width: 4em;
  transition: 0.5s ease;
}

.room_card:hover .avatar img {
  transform: scale(1.5);
}

/* --infos  */
/* .room_card .infos  */
.room_card .infos {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.room_card .infos .room_username {
  font-size: 1.1em;
  font-weight: bold;
}

/* --notification  */
/* .room_card .bell  */
.room_card .bell {
  position: absolute;
  right: 10px;
  transform: rotate(22deg);
}

/* .room_card .connected  */
.room_card .connected {
  position: absolute;
  left: 1em;
  display: block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
</style>