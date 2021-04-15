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
        <div v-if="is_login" class="col-12">
          <div class="row">
            <div class="col-10 col-sm-7 col-md-6 col-lg-4 m-auto">
              <div class="login row g-3">
                <InputField type="email" placeholder="Email" />

                <InputField type="password" placeholder="Password" />

                <div class="text-lg">
                  I want to
                  <span
                    @click="handleSwitchConnect"
                    class="text-white"
                    style="text-decoration: underline; cursor: pointer"
                    >SignUp</span
                  >
                </div>

                <button
                  class="btn text-white"
                  style="border: 1px solid white; text-transform: uppercase"
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- signup form  -->
        <div v-else class="signup">
          <div class="row">
            <div class="col-10 col-sm-7 col-md-6 col-lg-4 m-auto">
              <div class="login row g-3">
                <InputField type="text" placeholder="Username" />

                <InputField type="email" placeholder="Email" />

                <InputField type="password" placeholder="Password" />

                <InputField type="password" placeholder="Confirm Password" />

                <!-- add image  -->
                <div class="py-1">
                  <div class="row g-0">
                    <div class="col">
                      <input type="file" accept="image/*" style="height: 0" />
                      <span
                        class="btn border text-lg"
                        style="text-transform: uppercase"
                        >avatar</span
                      >
                    </div>

                    <div v-if="signup.avatar" class="col">
                      <div class="image_content"></div>
                    </div>
                  </div>
                </div>

                <div class="text-lg">
                  I want to
                  <span
                    @click="handleSwitchConnect"
                    class="text-white"
                    style="text-decoration: underline; cursor: pointer"
                    >Login</span
                  >
                </div>

                <button
                  class="btn text-white"
                  style="border: 1px solid white; text-transform: uppercase"
                >
                  signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../../components/UI/InputField.vue";
export default {
  layout: "login",
  components: { InputField },
  head() {
    return {
      title: this.is_login ? "Arrow | Login" : "Arrow | Signup",
    };
  },
  data: () => ({
    is_login: true,
    signup: {},
    login: {},
  }),
  methods: {
    handleSwitchConnect() {
      this.is_login = !this.is_login;
    },
  },
};
</script>

<style scoped>
</style>