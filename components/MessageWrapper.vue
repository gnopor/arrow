<template>
  <div id="message_wrapper">
    <!-- message box  -->
    <section class="messages_box"></section>

    <!-- message input  -->
    <section class="message_input">
      <div class="custom_input">
        <span ref="resizer" id="resizer" />
        <textarea
          @input="$refs.resizer.innerText = $refs.message_input.value"
          ref="message_input"
          placeholder="Enter message here..."
        />
      </div>

      <button>
        <client-only>
          <mdicon name="send" />
        </client-only>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: "MessageWrapper",
  mounted() {},
  methods: {},
};
</script>

<style scoped>
#message_wrapper {
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* massages_box  */

/* message_input  */
.message_input {
  display: flex;
  align-items: flex-end;
  background: var(--base);
  padding: 0.5rem 0;
}

/* .message_input .custom_input  */
.custom_input {
  flex: 1 0;
  display: flex;
}

#resizer {
  display: block;
  max-width: 1px;
  overflow: hidden;
}
.custom_input > textarea {
  background: var(--base);
  color: var(--white);
  resize: none;
  outline: none;
  width: 100%;
  overflow: hidden;
}

.message_input button {
  background: var(--base);
  color: var(--accent);
  border: none;
  height: 60px;
  width: 60px;
  outline: none;
}

.message_input button:active {
  background: var(--accent);
  color: var(--base);
}
</style>