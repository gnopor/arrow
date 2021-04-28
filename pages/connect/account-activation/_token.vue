<template>
  <div class="container vh-100" id="account_activation">
    {{ error }}
  </div>
</template>

<script>
import alert from "@/static/mixins/alert";
export default {
  layout: "login",
  auth: false,
  mixins: [alert],
  head() {
    return {
      title: "Arrow | Account Activation",
    };
  },
  created() {
    this.handleActivation();
  },
  methods: {
    async handleActivation() {
      try {
        this.loading = true;
        const token = this.$route.params.token;
        const result = await this.$axios.post(
          `${process.env.baseUrl}/auth/account-activation`,
          { token }
        );

        this.message = result.data.message;
        this.$router.push("/connect");
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>