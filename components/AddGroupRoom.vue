<template >
  <section id="add_group">
    <button class="bg-base text-white">
      <span>
        <client-only>
          <mdicon name="accountMultiplePlus" />
        </client-only>
      </span>
      <span class="mx-2"> New Group </span>
    </button>

    <!-- modal  -->
  </section>
</template>

<script>
export default {
  name: "AddGroupRoom",
};
</script>

<style  scoped>
section > button {
  outline: none;
  border: none;
}
</style>