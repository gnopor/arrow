<template>
  <div class="connect bg-base">
    <section
      class="container vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="connect w-100 row">
        <div class="col-12">
          <div class="logo d-flex justify-content-center">
            <img class="m-auto" src="/images/logo1.png" alt="logo" />
          </div>
        </div>
        <!-- login form  -->
        <article v-if="is_login" class="col-12">
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
                  @click="handleRegister"
                >
                  login
                </button>
              </div>
            </div>
          </div>
        </article>

        <!-- signup form  -->
        <article v-else class="signup">
          <div class="row">
            <div class="col-10 col-sm-7 col-md-6 col-lg-4 m-auto">
              <div class="login row g-3">
                <InputField
                  v-model="signup.username"
                  type="text"
                  placeholder="Username"
                />

                <InputField
                  v-model="signup.email"
                  type="email"
                  placeholder="Email"
                />

                <InputField
                  v-model="signup.password"
                  type="password"
                  placeholder="Password"
                />

                <InputField
                  v-model="signup.confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                />

                <!-- add image  -->
                <div class="py-1">
                  <div class="row g-0">
                    <div class="col-6">
                      <input
                        ref="file_input"
                        type="file"
                        accept="image/*"
                        style="height: 0"
                        @change="showImage"
                      />
                      <span
                        class="btn border text-lg"
                        style="text-transform: uppercase"
                        @click="$refs.file_input.click()"
                        >avatar</span
                      >
                    </div>

                    <div class="col-6">
                      <figure
                        class="h-100"
                        style="position: relative"
                        ref="avatar"
                      ></figure>
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
                  @click="handleRegister"
                >
                  signup
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import alert from "@/static/mixins/alert";
import InputField from "../../components/UI/InputField.vue";
export default {
  layout: "login",
  components: { InputField },
  mixins: [alert],
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
    showImage(event) {
      const content = this.$refs.avatar;
      const img = document.createElement("img");
      const reader = new FileReader();
      const selectedFile = event.target.files[0];
      this.signup.avatar = selectedFile;

      img.title = selectedFile.name;
      img.alt = "tayou blaise arrow";
      img.style.height = "50px";
      img.style.width = "50px";
      img.style.borderRadius = "50%";
      img.style.position = "absolute";
      img.style.bottom = "0";
      reader.onload = (event) => {
        img.src = event.target.result;
        content.lastChild && content.lastChild.remove();
        content.appendChild(img);
      };
      reader.readAsDataURL(selectedFile);
    },
    async handleRegister() {
      try {
        this.loading = !this.loading;
        // console.log(this.signup);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
</style>