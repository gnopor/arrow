<template>
  <div v-if="current_room" id="message_wrapper" class="bg-lg">
    <!-- message box  -->
    <section ref="messages_box" class="messages_box">
      <MessageCard />
      <MessageCard current_user />
      <MessageCard />
      <MessageCard current_user />
      <MessageCard />
      <MessageCard current_user />

      <!-- user typing alert  -->
      <span v-if="isNewWritingAlert" id="user_typing_alert"
        >@{{ user_writing_alert.user.username }} is writing a message...
      </span>
    </section>

    <!-- message input  -->
    <section class="message_input">
      <div class="custom_input">
        <span ref="resizer" id="resizer" />
        <textarea
          @input="handleMessageInput"
          @blur="handleCreateTypingAlert(false)"
          ref="message_input"
          placeholder="Enter your message here..."
        />
      </div>

      <button>
        <client-only>
          <mdicon name="send" />
        </client-only>
      </button>

      <!-- scroll button  -->
      <button
        v-if="show_scroll_down"
        id="scroll_button"
        class="bg-accent text-white"
        @click="scrollToDown"
      >
        <client-only>
          <mdicon name="chevron-down" />
        </client-only>
      </button>
    </section>
  </div>
  <div v-else class="h-100 d-flex justify-content-center align-items-center">
    <div class="d-flex flex-column align-items-center">
      <img src="/images/logo2.png" alt="arrow logo" />
      <span>Start by choosing one from the left panel:)</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MessageCard from "@/components/UI/MessageCard";
export default {
  name: "MessageWrapper",
  components: {
    MessageCard,
  },
  props: {
    user: { type: Object },
  },
  data: () => ({
    show_scroll_down: true,
    max_scroll: 0,
    box: null,
    current_user: null,
  }),
  watch: {
    current_room() {
      if (this.current_room) {
        this.$nextTick(() => this.initMessageBox());
      }
    },
  },
  mounted() {
    if (this.current_room) {
      this.$nextTick(() => this.initMessageBox());
    }
  },
  methods: {
    ...mapActions(["createWritingAlert"]),
    initMessageBox() {
      this.box = document.querySelector(".messages_box");

      // handle messages_box scroll event
      this.box.addEventListener("scroll", (event) => {
        const scroll = event.target.scrollTop;
        this.show_scroll_down = scroll < this.max_scroll;
        if (scroll > this.max_scroll) {
          this.max_scroll = scroll;
        }
      });
      this.$nextTick(() => {
        this.box.scrollTo(0, this.box.scrollHeight);
      });

      // handle box height
      window.addEventListener("resize", (event) => this.updateHeight(this.box));
      this.updateHeight(this.box);
    },
    updateHeight(box) {
      const header = document.querySelector("header");
      const input = document.querySelector(".message_input");
      const outer_height = header.clientHeight + input.clientHeight;
      const height = window.innerHeight - outer_height;

      box.style.maxHeight = `${height}px`;
    },
    scrollToDown() {
      this.box.scrollTo({ top: this.max_scroll, left: 0, behavior: "smooth" });
    },
    handleMessageInput() {
      this.$refs.resizer.innerText = this.$refs.message_input.value;
      this.handleCreateTypingAlert(true);
    },
    handleCreateTypingAlert(is_user_writing) {
      const param = {
        user: this.user,
        is_writing: is_user_writing,
      };

      this.createWritingAlert(param);
    },
  },
  computed: {
    ...mapState(["current_room", "user_writing_alert"]),
    isNewWritingAlert() {
      const alert = this.user_writing_alert;
      return (
        this.current_room._id &&
        alert &&
        alert.id_room == this.current_room._id &&
        alert.user._id != this.user._id
      );
    },
  },
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

/* messages_box  */
.messages_box {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}

/* .messages_box user_typing_alert  */
#user_typing_alert {
  text-align: center;
  font-style: italic;
  text-decoration: underline;
  font-size: 0.9em;
  padding: 5px;
  color: #333;
  animation: user_typing_alert 2s ease infinite;
}
@keyframes user_typing_alert {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

/* message_input  */
.message_input {
  position: relative;
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

/* scroll_button */
#scroll_button {
  position: absolute;
  top: -50px;
  right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--white);
  border-radius: 50%;
  cursor: pointer;
  height: 42px;
  width: 42px;
}
</style>