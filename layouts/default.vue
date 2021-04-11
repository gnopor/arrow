<template>
  <div>
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
</style>
