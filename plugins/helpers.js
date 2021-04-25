import Vue from "vue";

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

    form.password.trim() != form.confirm_passworn.trim() &&
      reject(errors("passords"));

    (form.avatar && form.avatar.size) || reject(errors("avatar"));

    !form.email
      .trim()
      .match(/^\b[A-Za-z0-9_]+@[A-Za-z0-9_]+\.[A-Za-z0-9]+$/g) &&
      reject(errors("email"));

    resolve();
  });
};

// ==> send images
Vue.prototype.$__sendImage = (file, name) => {
  const API_URL = `${process.env.baseUrl}/files/upload-file`;
  const formData = new FormData();
  formData.append(name, file, file.name);

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
