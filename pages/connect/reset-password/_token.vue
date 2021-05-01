<template>
  <section
    class="d-flex align-items-center bg-base text-white vh-100"
    id="reset_password"
  >
    <div class="container">
      <div class="row">
        <!-- logo  -->
        <div class="col-12">
          <figure class="d-flex justify-content-center">
            <nuxt-link to="/">
              <img
                class=""
                src="/images/logo2.png"
                alt="tayou blaise arrow image"
              />
            </nuxt-link>
          </figure>
        </div>

        <!-- form  -->
        <div class="col-12">
          <div class="row">
            <div class="col-10 col-sm-7 col-md-6 col-lg-4 m-auto">
              <InputField
                v-model="new_password"
                class="my-1"
                type="password"
                placeholder="New password..."
              />
              <InputField
                v-model="confirm_password"
                class="my-1"
                type="password"
                placeholder="Confirm password"
              />

              <button
                class="w-100 my-2 p-2 bg-base text-white"
                @click="handleResetPassword"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import alert from "@/static/mixins/alert";
import InputField from "@/components/UI/InputField";
export default {
  layout: "login",
  auth: false,
  mixins: [alert],
  components: {
    InputField,
  },
  head() {
    return {
      title: "Arrow | Reset Password",
    };
  },
  data: () => ({
    token: null,
    new_password: null,
    confirm_password: null,
  }),
  created() {
    this.token = this.$route.params.token;
  },
  methods: {
    async handleResetPassword() {
      try {
        this.loading = true;
        await this.$__validateNewPasswordForm(
          this.new_password,
          this.confirm_password
        );

        const {
          data,
        } = await this.$axios.post(
          `${process.env.baseUrl}/auth/reset-password`,
          { step: "end", password: this.new_password, token: this.token }
        );
        this.message = data.message;
        this.$router.push("/connect");
      } catch (error) {
        this.error =
          error.response && error.response.data
            ? error.response.data.error
            : error;
        console.log("Error :", error);
      } finally {
        this.new_password = null;
        this.confirm_password = null;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
#reset_password button {
  border: 1px solid var(--white);
  font-weight: bold;
}

#reset_password button:active {
  background: var(--accent) !important;
}
</style>