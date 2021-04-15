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
};
</script>

<style>
.main_layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
