<template>
  <article :ref="room._id" class="room_card p-2" @click="handleFocus">
    <!-- avatar  -->
    <figure class="avatar">
      <img :src="getAvatarURI" alt="room title avatar" />
    </figure>

    <!-- name and creation date  -->
    <div class="infos mx-2">
      <span class="room_username">@{{ room.username }}</span>
      <span class="room_date">{{ $__formatDate(room._date_creation) }}</span>
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
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "RoomCard",
  props: {
    room: {
      type: Object,
      required: true,
    },
    group: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    show_bell: true,
  }),
  created() {
    console.log(this.room._id);
  },
  methods: {
    handleFocus() {
      const room = this.$refs[this.room._id];
      document
        .querySelectorAll(".room_card[data-active]")
        .forEach((room) => room.removeAttribute("data-active"));

      room.setAttribute("data-active", true);
    },
    handleConnectedUser() {
      const room = this.$refs[this.room_name];
      if (this.active) {
        room.setAttribute("data-connected", true);
      } else {
        room.removeAttribute("data-connected");
      }
    },
  },
  computed: {
    ...mapState(["new_user_id"]),
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