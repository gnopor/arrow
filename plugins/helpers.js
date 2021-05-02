import Vue from "vue";

const validateEmail = email => {
  return typeof email == "string"
    ? email.match(/^\b[A-Za-z0-9_]+@[A-Za-z0-9_]+\.[A-Za-z0-9]+$/g)
    : false;
};

// ==> set user
Vue.prototype.$__setUser = function(user) {
  this.$auth.$storage.setCookie("user", user, { isJson: true });
};

// ==> get user
Vue.prototype.$__getUser = function() {
  return this.$auth.$storage.getCookie("user");
};

// ==> remove user
Vue.prototype.$__removeUser = function() {
  this.$auth.$storage.removeCookie("user", { isJson: true });
};

// ==> validate Register form
Vue.prototype.$__validateRegisterForm = form => {
  const fields = ["username", "email", "password", "confirm_password"];
  const errors = field => `There is a problem with your ${field}`;

  return new Promise((resolve, reject) => {
    fields.forEach(field => {
      if (!Object.keys(form).includes(field)) {
        reject(errors("fields"));
      }
    });

    form.password.trim() != form.confirm_password.trim() &&
      reject(errors("passords"));

    (form.avatar && form.avatar.size) || reject(errors("avatar"));

    !validateEmail(form.email.trim()) && reject(errors("email"));

    resolve(form);
  });
};

// ==> send images
Vue.prototype.$__sendImage = (file, name) => {
  const API_URL = `${process.env.baseUrl}/files/file`;
  const formData = new FormData();
  formData.append(`arrow-${name}`, file, file.name);

  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(err => reject(err));
  });
};

// ==> Validate Reset Password Form
Vue.prototype.$__validateResetPasswordForm = email =>
  new Promise((resolve, reject) => {
    !validateEmail(email) && reject("Wrong Email address");
    resolve(email);
  });

// ==> Validate create new password form
Vue.prototype.$__validateNewPasswordForm = (new_password, confirm_password) =>
  new Promise((resolve, reject) => {
    const password = new_password.toString().trim();
    (password && password.length > 0) || reject("Enter new password");

    password == confirm_password || reject("Your password are not the same");

    resolve(password);
  });

Vue.prototype.$__validateLoginForm = ({ email, password }) =>
  new Promise((resolve, reject) => {
    !validateEmail(email) && reject("Enter a valid email address");
    !password.toString().trim().length > 0 && reject("Enter a valid password");

    resolve({ email, password });
  });
