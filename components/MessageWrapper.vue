<template>
  <div id="message_wrapper">
    <!-- message box  -->
    <section class="messages-box"></section>

    <!-- message input  -->
    <section class="message_input">
      sdafsdf
      <InputField type="text" placeholder="Enter message here..." />
    </section>
  </div>
</template>

<script>
export default {
  name: "MessageWrapper",
};
</script>

<style scoped>
#message_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>