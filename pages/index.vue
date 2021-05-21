<template>
  <div class="container" id="home">
    <div class="row h-100">
      <!-- side menu  -->
      <section class="d-none d-md-flex col-md-4" id="side_menu_container">
        <SideMenu v-if="current_user._id" :user="current_user" />
      </section>

      <!-- message container  -->
      <section class="col-12 col-md-6" id="message_container">
        <MessageWrapper v-if="current_user._id" :user="current_user" />
      </section>
    </div>
  </div>
</template>

<script>
import MessageWrapper from "@/components/MessageWrapper.vue";
import SideMenu from "@/components/SideMenu.vue";
export default {
  components: {
    MessageWrapper,
    SideMenu,
  },
  data: () => ({
    current_user: {},
  }),
  async created() {
    // set current user
    this.current_user = await this.$__getUser();
    if (!(this.current_user && this.current_user._id)) {
      this.$auth.logout();
    }
  },
};
</script>

<style scoped>
/* home  */
#home {
  flex: 1 0;
  border: 1px solid #000;
}

/* side menu  */

/* message_container  */
#message_container {
  flex: 1 0;
  border: 1px solid #000;
  border-width: 1px 0 1px 1px;
  padding: 0;
}
</style>
