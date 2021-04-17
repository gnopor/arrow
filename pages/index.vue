<template>
  <div class="container" id="home">
    <div class="row h-100">
      <!-- side menu  -->
      <section class="d-none d-md-flex col-md-3" id="side_menu_container">
        a
      </section>

      <!-- message container  -->
      <section class="col-12 col-md-7" id="message_container">
        <MessageWrapper />
      </section>
    </div>
  </div>
</template>

<script>
import MessageWrapper from "@/components/MessageWrapper.vue";
export default {
  components: {
    MessageWrapper,
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
