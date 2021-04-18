<template>
  <div class="main_layout">
    <Header />
    <Nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
export default {
  components: {
    Footer,
    Header,
  },
  created() {
    if (process.client) {
      const handlers = [];
      for (let action in this.$store._actions) {
        handlers.push({ name: action, store_handler: "dispatch" });
      }
      for (let mutation in this.$store._mutations) {
        handlers.push({ name: mutation, store_handler: "commit" });
      }
      handlers.forEach((handler) => {
        if (handler.name.slice(0, 7) == "SOCKET_") {
          const event_name = handler.name.substr(7);
          this.$socket.on(event_name, (data) => {
            this.$store[handler.store_handler](handler.name, data);
          });
        }
      });
    }
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
