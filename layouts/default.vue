<template>
  <div v-if="loaded" class="main_layout">
    <Header />
    <Nuxt />
  </div>
  <div v-else class="vh-100 bg-base d-flex flex-column justify-content-center">
    <img class="m-auto" src="/images/logo2.png" alt="arrow logo" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import socket from "@/static/mixins/socket.io";
import alert from "@/static/mixins/alert";
import Header from "@/components/Header/Header";

export default {
  mixins: [socket, alert],
  components: {
    Header,
  },
  data: () => ({
    loaded: false,
  }),
  watch: {
    new_error() {
      if (this.new_error) {
        this.error = this.new_error;
        this.setNewError(false);
      }
    },
  },
  created() {
    this.handleInitStore();
  },
  methods: {
    ...mapActions(["InitUsersAndRooms"]),
    ...mapMutations(["setNewError"]),
    async handleInitStore() {
      try {
        this.loading = true;
        // init user list and room
        if (this.users.length == 0) {
          await this.InitUsersAndRooms(this);
        }

        this.loaded = true;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapState(["users", "new_error"]),
  },
};
</script>

<style>
.main_layout {
  background: var(--base);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>
