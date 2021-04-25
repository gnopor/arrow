<template>
  <div>
    <input
      :type="type"
      @input="$emit('input', $event.target.value)"
      v-bind:value="value"
      class="form-control bg-base text-lg"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    value: {
      type: [String, Number],
    },
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