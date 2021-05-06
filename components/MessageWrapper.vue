<template>
  <div id="message_wrapper" class="bg-lg">
    <!-- message box  -->
    <section class="messages_box">
      <MessageCard />
      <MessageCard current_user />
      <MessageCard />
      <MessageCard current_user />
      <MessageCard />
      <MessageCard current_user />
    </section>

    <!-- message input  -->
    <section class="message_input">
      <div class="custom_input">
        <span ref="resizer" id="resizer" />
        <textarea
          @input="$refs.resizer.innerText = $refs.message_input.value"
          ref="message_input"
          placeholder="Enter your message here..."
        />
      </div>

      <button @click="handleTest">
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
</template>

<script>
import { mapActions } from "vuex";
import MessageCard from "@/components/UI/MessageCard";
export default {
  name: "MessageWrapper",
  components: {
    MessageCard,
  },
  data: () => ({
    show_scroll_down: false,
    max_scroll: 0,
    box: null,
  }),
  mounted() {
    // query DOM
    this.box = document.querySelector(".messages_box");
    this.$nextTick(() => {
      this.box.scrollTo(0, this.box.scrollHeight);
    });

    // handle box scroll event
    this.box.addEventListener("scroll", (event) => {
      const scroll = event.target.scrollTop;
      this.show_scroll_down = scroll < this.max_scroll;
      if (scroll > this.max_scroll) {
        this.max_scroll = scroll;
      }
    });

    // handle box height
    this.handleMessageBoxHeight();
  },
  methods: {
    ...mapActions(["alertOtherUser"]),
    handleMessageBoxHeight() {
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
      // this.box.scrollTo(0, this.max_scroll);
      this.box.scrollTo({ top: this.max_scroll, left: 0, behavior: "smooth" });
    },
    handleTest() {
      this.alertOtherUser("fake_id");
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
  overflow: auto;
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