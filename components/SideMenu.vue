<template>
  <aside id="side_menu" class="bg-lg h-100">
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
        <!-- <RoomCard
          room_name="room_name"
          creation_date="room creation date"
    
        /> -->
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

      <div class="group_list">group list</div>

      <div class="new_group title">
        <AddGroupRoom />
        <!-- <span>
          <client-only>
            <mdicon name="accountMultiplePlus" />
          </client-only>
        </span>
        <span class="mx-2"> New Group </span> -->
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
  data: () => ({
    current_user: {},
  }),
  async created() {
    // get current user info
    this.current_user = await this.$__getUser();
    if (!this.current_user._id) {
      this.$auth.logout();
    }
  },
  computed: {
    ...mapState(["users"]),
    chatRoom() {
      return this.users.filter((user) => user._id != this.current_user._id);
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