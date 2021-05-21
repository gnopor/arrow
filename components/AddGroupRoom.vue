<template >
  <section class="d-flex flex-column bg-base" id="add_group">
    <!-- add group form      -->
    <form ref="form" class="row m-2 hide_form" @submit.prevent>
      <InputField
        class="col-12"
        v-model="group_name"
        placeholder="Enter Group's name"
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

      <div class="col-12">
        <button class="my-2 py-1 bg-accent" @click="handleAddGroup">
          + Add
        </button>
      </div>
    </form>

    <!-- trigger  -->
    <button
      class="bg-base p-2 text-white add_group_trigger"
      @click="handleFormDisplay"
    >
      <span>
        <client-only>
          <mdicon name="accountMultiplePlus" />
        </client-only>
      </span>
      <span class="mx-2"> New Group </span>
    </button>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";
import alert from "@/static/mixins/alert.js";
export default {
  name: "AddGroupRoom",
  mixins: [alert],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    show_form: false,
    group_name: "",
    avatar: null,
  }),
  methods: {
    ...mapActions(["createRoom"]),
    handleFormDisplay() {
      const form = this.$refs.form;
      this.show_form = !this.show_form;
      if (this.show_form) {
        form.classList.replace("hide_form", "show_form");
      } else {
        form.classList.replace("show_form", "hide_form");
      }
    },
    async handleAddGroup() {
      try {
        this.loading = true;
        let form = { title: this.group_name, avatar: this.avatar };
        await this.$__validateAddGroupRoomForm(form);

        const group_id = await uuidv4();
        form = {
          ...form,
          _id: group_id,
          id_admin: this.user._id,
          is_group: true,
          users: [this.user._id],
        };

        // send avatar
        const img = await this.$__sendImage(this.avatar, form._id);
        form.avatar = img.path;

        this.createRoom(form);

        // close form
        this.handleFormDisplay();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    showImage(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) {
        return;
      }
      const content = this.$refs.avatar;
      const img = document.createElement("img");
      const reader = new FileReader();

      this.avatar = selectedFile;

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
  },
};
</script>

<style  scoped>
/* form  */
form {
  display: block;
  overflow: hidden;
  transition: 0.5s ease;
}

form button:hover {
  color: white;
}

.show_form {
  max-height: 200px;
}

.hide_form {
  max-height: 0px;
  transition: 0.5s ease;
}

/* button  */
button {
  border: none;
  width: 100%;
}
.add_group_trigger {
  z-index: 2;
}
</style>