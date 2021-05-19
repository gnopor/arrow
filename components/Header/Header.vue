<template>
  <header v-if="current_user" ref="app_header" class="bg-base py-3">
    <nav class="container d-flex justify-content-between">
      <!-- menu  -->
      <div class="d-flex d-md-none align-items-center text-white">
        <span style="cursor: pointer" @click="show_side_menu = !show_side_menu">
          <client-only>
            <mdicon :name="show_side_menu ? 'close' : 'menu'" />
          </client-only>
        </span>
      </div>

      <!-- logo  -->
      <div class="d-flex align-items-center">
        <img
          src="/images/logo1.png"
          alt="tayoublaise arrow"
          style="width: 100px; height: 50px"
        />
      </div>

      <!-- user infos  -->
      <div class="d-flex align-items-center text-white">
        <div class="row">
          <span class="col d-none d-md-flex align-items-center">
            {{ current_user.username }}
          </span>
          <img
            class="col"
            :src="getAvatarURI"
            style="width: 70px; border-radius: 50%"
          />
        </div>
      </div>
    </nav>

    <!-- side menu container  -->
    <div
      v-if="show_side_menu"
      id="sideMenuWrapper"
      class="d-md-none"
      :style="`height: calc(100vh - ${getSideMenuHeight}px)`"
    >
      <SideMenu />
    </div>
  </header>
</template>

<script>
import SideMenu from "@/components/SideMenu";
export default {
  name: "Header",
  components: {
    SideMenu,
  },
  data: () => ({
    show_side_menu: false,
    current_user: null,
  }),
  created() {
    // set current user
    this.current_user = this.$__getUser();
    if (!(this.current_user && this.current_user._id)) {
      this.$auth.logout();
    }
  },
  computed: {
    getSideMenuHeight() {
      const height = this.$refs.app_header.clientHeight;
      return height;
    },
    getAvatarURI() {
      return `${process.env.baseUrl}${this.current_user.avatar}`;
    },
  },
};
</script>

<style scoped>
#sideMenuWrapper {
  position: fixed;
  width: 100vw;
  z-index: 10;
}
</style>