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
                <InputField
                  v-model="login.email"
                  type="email"
                  placeholder="Email"
                />

                <InputField
                  v-model="login.password"
                  type="password"
                  placeholder="Password"
                />

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
                  @click="handleLogin"
                >
                  login
                </button>

                <div class="">
                  <span
                    class="float-end text-white"
                    style="text-decoration: underline; cursor: pointer"
                    data-bs-toggle="modal"
                    data-bs-target="#reset_password_modal"
                  >
                    I have forgot my password.
                  </span>
                </div>
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

    <!-- modals  -->

    <ResetPasswordModal id="reset_password_modal" />
    <!-- /modals  -->
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import alert from "@/static/mixins/alert";
import ResetPasswordModal from "@/components/UI/ResetPasswordModal";
import InputField from "../../components/UI/InputField";
export default {
  layout: "login",
  components: { InputField, ResetPasswordModal },
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
      const selectedFile = event.target.files[0];
      if (!selectedFile) {
        return;
      }
      const content = this.$refs.avatar;
      const img = document.createElement("img");
      const reader = new FileReader();

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
        this.loading = true;
        // validate form
        let user = await this.$__validateRegisterForm({ ...this.signup });
        user._id = uuidv4();
        delete user.confirm_password;

        // send avatar
        const img = await this.$__sendImage(this.signup.avatar, user._id);
        user.avatar = img.path;

        // send new user data
        const { data } = await this.$axios.post(
          `${process.env.baseUrl}/auth/register`,
          user
        );
        this.message = data.message;

        this.signup = {};
        this.is_login = true;
      } catch (error) {
        this.error =
          error.response && error.response.data
            ? error.response.data.error
            : error;
        console.log("Error: ", error);
      } finally {
        this.loading = false;
      }
    },
    async handleLogin() {
      try {
        this.loading = true;
        const login_data = {
          email: this.login.email,
          password: this.login.password,
        };
        await this.$__validateLoginForm(login_data);

        const { data } = await this.$auth.loginWith("local", {
          data: login_data,
        });
        console.log(data);
        debugger;
      } catch (error) {
        this.error =
          error.response && error.response.data
            ? error.response.data.error
            : error;
        console.log("Error: ", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
</style>