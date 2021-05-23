<template>
  <article ref="message" class="message">
    <div>
      <div v-if="sender" class="user_infos">
        <span>@{{ sender.username }}</span>
      </div>
      <div class="message_body">
        <p>
          {{ message.text }}
        </p>
      </div>
      <div class="date">
        <span>{{ $__formatDate(message.date_creation) }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "MessageCard",
  props: {
    sender: {
      type: Object,
      default: () => {},
    },
    message: {
      type: Object,
      required: true,
    },
    current_user: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // adapt current user message
    this.$nextTick(() => {
      this.handleCurrentUserMessage();
    });
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