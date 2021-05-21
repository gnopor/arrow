// Better create you own dialog

export default {
  data: () => ({
    message: "",
    error: "",
    loading: false,
    spinner: "",
    alert: ""
  }),
  watch: {
    loading() {
      console.log(this.loading);

      if (this.loading) {
        return this.showLoading();
      }
      this.spinner.remove();
    },
    message() {
      !!this.message && this.showAlert();
      this.message = "";
    },
    error() {
      !!this.error && this.showAlert();
      this.error = "";
    }
  },
  mounted() {},
  methods: {
    showAlert() {
      this.alert = document.createElement("section");
      this.alert.innerHTML = `
        <!-- Button trigger modal -->
        <button id="custom_alert" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Launch static backdrop modal
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-accent text-white">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">${
                  this.error ? "Error" : "Message"
                }</h5>
                <button id="custom_close_alert" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ${this.error ? this.formatedError : this.message}
              </div>
            </div>
          </div>
        </div>
      `;

      document.querySelector("#__layout").appendChild(this.alert);
      this.$nextTick(() => {
        document.querySelector("#custom_alert").click();
        document
          .querySelector("#custom_close_alert")
          .addEventListener("click", () => {
            this.closeAlert();
          });
      });
    },
    closeAlert() {
      this.$nextTick(() => {
        this.alert.remove();
      });
    },
    showLoading() {
      const spinner = document.createElement("div");
      spinner.innerHTML = `
      <div class="spinner-border text-accent" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`;
      spinner.style.position = "fixed";
      spinner.style.top = "50vh";
      spinner.style.left = "50vw";
      spinner.style.zIndex = "200";

      this.spinner = spinner;
      document.querySelector("body").appendChild(this.spinner);
    }
  },
  computed: {
    formatedError() {
      return (
        (this.error.response && this.error.response.data.error) || this.error
      );
    }
  }
};
