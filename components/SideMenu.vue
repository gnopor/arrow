<template>
  <div id="side_menu" class="bg-lg h-100">
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
        <div class="room_card p-2">
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
        </div>

        <div data-active class="room_card p-2">
          <div class="avatar">
            <img src="/images/avatar.png" alt="room title avatar" />
          </div>
          <div class="infos mx-2">
            <span class="room_username">@room_name</span>
            <span class="room_date">room creation date</span>
          </div>
        </div>
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
  </div>
</template>

<script>
export default {
  name: "SideMenu",
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