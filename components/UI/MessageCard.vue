<template>
  <article ref="message" class="message">
    <div>
      <div class="user_infos">
        <span>@username</span>
      </div>
      <div class="message_body">
        <p>
          hi techlead here. Today our is camhubasdf adsjflsjad;f
          s;adjfdasj;fldsja fdsajfsdafs body
        </p>
      </div>
      <div class="date">
        <span>{{ "new Date()" }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "MessageCard",
  props: {
    current_user: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // adapt current user message
    this.handleCurrentUserMessage();
  },
  methods: {
    handleCurrentUserMessage() {
      const message_card = this.$refs.message;
      this.current_user && message_card.setAttribute("data-current", true);
    },
  },
};
</script>

<style scoped>
.message {
  padding: 5px;
  margin: 5px 0;
}

.message > div {
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 15px;
  padding: 5px;
  width: fit-content;
  max-width: 80%;
  overflow-wrap: break-word;
}

.message > div > .user_infos {
  font-weight: bold;
}

.message > div > .date > * {
  float: right;
}

.message[data-current] > div {
  background: var(--accent);
  color: var(--white);
}

.message[data-current] * {
  float: right;
}
</style>