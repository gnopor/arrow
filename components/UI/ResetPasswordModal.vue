<template>
  <section class="modal" data-bs-backdrop="static" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div
        class="modal-content bg-base"
        style="border: 1px solid var(--accent)"
      >
        <div class="modal-header">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            Password Reset
          </h5>
          <button
            ref="close_button"
            type="btn"
            class="btn bg-base text-white"
            data-bs-dismiss="modal"
          >
            X
          </button>
        </div>

        <div class="modal-body">
          <InputField
            v-model="email"
            type="email"
            placeholder="Enter your email..."
          />
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn bg-base text-white"
            style="border: 1px solid var(--white)"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InputField from "@/components/UI/InputField";
import Alert from "@/static/mixins/alert";
export default {
  name: "ResetPasswordModal",
  components: { InputField },
  mixins: [Alert],
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        await this.$__validateResetPasswordForm(this.email);
        const {
          data,
        } = await this.$axios.post(
          `${process.env.baseUrl}/auth/reset-password`,
          { step: "start", email: this.email }
        );
        this.message = data.message;
      } catch (error) {
        this.error =
          error.response && error.response.data
            ? error.response.data.error
            : error;
        console.log("Error: ", error);
      } finally {
        this.email = "";
        this.loading = false;
        this.$refs.close_button.click();
      }
    },
  },
};
</script>

<style scoped>
</style>