<template>
  <div id="middleware" class="bg-base">
    <span class="">Middleware</span>
    <div class="row">
      <div class="col-4 bg-base">base</div>
      <div class="col-4 bg-accent text-dg">accent</div>
      <div class="col-4 bg-white">white</div>
      <div class="col-4 bg-lg">lg</div>
      <div class="col-4 bg-dg">dg</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  created() {
    const user = this.$__getUser();
    if (user && user._id) {
      return this.$router.push("/");
    } else {
      this.$auth.logout();
    }
  },
};
</script>

<style scoped>
#middleware {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>