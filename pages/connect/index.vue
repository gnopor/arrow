<template>
  <div class="connect bg-base">
    <div
      class="container vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="connect w-100 row">
        <div class="col-12">
          <div class="logo d-flex justify-content-center">
            <img class="m-auto" src="/images/logo1.png" alt="logo" />
          </div>
        </div>
        <!-- login form  -->
        <div class="col-12">
          <div class="row">
            <div class="col-10 col-sm-7 col-md-6 col-lg-4 m-auto">
              <div class="login row g-3">
                <InputField type="email" placeholder="Email" />

                <InputField type="password" placeholder="Password" />
              </div>
            </div>
          </div>
        </div>

        <!-- signup form  -->
        <div class="signup"></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../../components/UI/InputField.vue";
export default {
  components: { InputField },
  head() {
    return {
      title: this.is_login ? "Arrow | Login" : "Arrow | Signup",
    };
  },
  data: () => ({
    is_login: true,
  }),
};
</script>

<style scoped>
</style>