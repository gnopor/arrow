<template>
  <div class="main_layout">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import socket from "@/static/mixins/socket.io";
// import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
export default {
  mixins: [socket],
  components: {
    Header,
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
