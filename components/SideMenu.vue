<template>
  <aside v-if="current_user._id" id="side_menu" class="bg-lg h-100">
    <!-- contact rooms -->
    <section id="contact_rooms">
      <div class="title">
        <span>
          <client-only>
            <mdicon name="accountCircle" />
          </client-only>
        </span>
        <span class="mx-2"> Contacts </span>
      </div>

      <div class="contact_list">
        <RoomCard v-for="(room, i) in chatRoom" :key="i" :room="room" />
      </div>
    </section>

    <!-- group   rooms-->
    <section id="group_rooms">
      <div class="title">
        <span>
          <client-only>
            <mdicon class="" name="accountGroup" />
          </client-only>
        </span>
        <span class="mx-2"> Groups </span>
      </div>

      <div class="group_list">
        <RoomCard v-for="(room, i) in groupRoom" :key="i" :room="room" />
      </div>

      <div class="new_group">
        <AddGroupRoom v-if="current_user._id" :user="current_user" />
      </div>
    </section>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import RoomCard from "@/components/UI/RoomCard";
import AddGroupRoom from "@/components/AddGroupRoom";

export default {
  name: "SideMenu",
  components: {
    RoomCard,
    AddGroupRoom,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    current_user: {},
  }),
  created() {
    this.current_user = this.user;
  },
  computed: {
    ...mapState(["users", "rooms"]),
    chatRoom() {
      return this.users.filter((user) => user._id != this.current_user._id);
    },
    groupRoom() {
      return this.rooms.filter((room) => room.is_group);
    },
  },
};
</script>

<style scoped>
/* side mene  */
#side_menu {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#side_menu > section {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

#side_menu > section .title {
  background: var(--base);
  color: var(--white);
  font-size: 1.2em;
  font-weight: bold;
  padding: 5px;
}

#side_menu > section > div:nth-child(2) {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
</style>