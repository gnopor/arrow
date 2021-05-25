<template>
  <section id="add_user_modal">
    <div class="modal_core p-2 bg-base text-white">
      <div class="custom_modal_title">
        <span style="font-weight: bold">Join Group</span>
        <span style="cursor: pointer" @click="$emit('close', {})">X</span>
      </div>
      <div class="custom_modal_body my-2">
        <span>You are not in this group!</span>
      </div>
      <div class="custom_modal_footer">
        <button class="bg-accent text-white" @click="$emit('join', {})">
          join
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AddUserModal",
  mounted() {
    const modal = document.querySelector("#add_user_modal ");

    modal.addEventListener(
      "click",
      function (e) {
        e.stopPropagation(); // if this isn't called, you'll get 2 alerts when clicking on #child
      },
      false
    );
  },
};
</script>

<style scoped>
#add_user_modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(51, 51, 51, 0.3);
  cursor: default;
  z-index: 500;
}

/* #add_user_modal modal_core */
#add_user_modal .modal_core {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  min-width: 300px;
  animation: custom_modal_show 0.4s ease forwards;
}

@keyframes custom_modal_show {
  0% {
    opacity: 0;
    transform: translate(0, -40px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.custom_modal_title {
  display: flex;
  justify-content: space-between;
}

.custom_modal_footer button {
  padding: 10px 0;
  border: none;
  font-weight: bold;
  width: 100%;
}
</style>