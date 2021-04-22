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
        <!-- <div class="room_card p-2">
          <div class="avatar">
            <img src="/images/avatar.png" alt="room title avatar" />
          </div>
          <div class="infos mx-2">
            <span class="room_username">@room_name</span>
            <span class="room_date">room creation date</span>
          </div>

          <div class="bell text-accent">
            <client-only>
              <mdicon name="bell" />
            </client-only>
          </div>
        </div> -->

        <RoomCard
          room_name="room_name"
          creation_date="room creation date"
          show_bell
        />
        <RoomCard
          room_name="room_name"
          creation_date="room creation date"
          active
        />
        <!-- 
        <div data-active class="room_card p-2">
          <div class="avatar">
            <img src="/images/avatar.png" alt="room title avatar" />
          </div>
          <div class="infos mx-2">
            <span class="room_username">@room_name</span>
            <span class="room_date">room creation date</span>
          </div>
        </div> -->
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
import RoomCard from "@/components/UI/RoomCard";
export default {
  name: "SideMenu",
  components: {
    RoomCard,
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