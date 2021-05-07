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

      <div v-if="users.length" class="contact_list">
        <RoomCard v-for="(profile, i) in users" :key="i" :room="profile" />
        <!-- <RoomCard
          room_name="room_name"
          creation_date="room creation date"
    
        /> -->
      </div>
      <span v-else> loading ... </span>
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
        <span>
          <client-only>
            <mdicon name="accountMultiplePlus" />
          </client-only>
        </span>
        <span class="mx-2"> New Group </span>
      </div>
    </section>
  </aside>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RoomCard from "@/components/UI/RoomCard";
export default {
  name: "SideMenu",
  components: {
    RoomCard,
  },
  data: () => ({
    current_user: null,
  }),
  async created() {
    // get current user info
    this.current_user = await this.$__getUser();
    if (!this.current_user._id) {
      this.$auth.logout();
    }

    // init user list and room
    if (this.users.length == 0) {
      this.InitUsersAndRooms(this);
    }
  },
  methods: {
    ...mapActions(["InitUsersAndRooms"]),
  },
  computed: {
    ...mapState(["users", "current_room"]),
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

/* #side_menu > section .room_card */

/* ==> */
/* contact_rooms  */
#contact_rooms {
}

/* ==> */
/* group_rooms  */
#group_rooms {
}

#group_rooms > .new_group {
  cursor: pointer;
}
</style>