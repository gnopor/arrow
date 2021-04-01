<template>
  <div>
    <input
      :type="type"
      class="form-control bg-base text-lg"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
</style>