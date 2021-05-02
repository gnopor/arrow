<template>
  <article :ref="room_name" class="room_card p-2">
    <!-- avatar  -->
    <figure class="avatar">
      <img :src="getAvatarURI" alt="room title avatar" />
    </figure>

    <!-- name and creation date  -->
    <div class="infos mx-2">
      <span class="room_username">@{{ room_name }}</span>
      <span class="room_date">{{ $__formatDate(creation_date) }}</span>
    </div>

    <!-- notification bell  -->
    <div v-if="show_bell" class="bell text-accent">
      <client-only>
        <mdicon name="bell" />
      </client-only>
    </div>
  </article>
</template>

<script>
export default {
  name: "RoomCard",
  props: {
    room_name: {
      type: String,
      required: true,
    },
    creation_date: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    show_bell: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // handle on focus
    this.handleFocus();
  },
  methods: {
    handleFocus() {
      const room = this.$refs[this.room_name];
      if (this.active) {
        room.setAttribute("data-active", true);
      } else {
        room.removeAttribute("data-active");
      }
    },
  },
  computed: {
    getAvatarURI() {
      return `${process.env.baseUrl}${this.avatar}`;
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

.room_card[data-active] {
  background: var(--base);
  color: var(--lg);
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

/* .room_card .avatar  */
.room_card .avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
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

/* .room_card .bell  */
.room_card .bell {
  position: absolute;
  right: 10px;
  transform: rotate(22deg);
}
</style>