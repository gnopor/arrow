const BASE_URL = process.env.baseUrl || "http://localhost:8000";
const LOCAL_URL = process.env.baseUrl || "http://localhost:3000";
const axiosBaseUrl = `${BASE_URL}/core`;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Arrow",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Blaise TAYOU chat app"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/styles.css", "@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/loadComponents.js",
    "~/plugins/helpers.js",
    { src: "~/plugins/mdi-vue.client.js", mode: "client" },
    {
      src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      mode: "client"
    },
    {
      src: "~/plugins/socket.io-client.client.js",
      mode: "client"
    }
  ],
  env: {
    baseUrl: BASE_URL,
    localUrl: LOCAL_URL
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: axiosBaseUrl
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // auth configuration
  auth: {
    // Options
    redirect: {
      login: "/connect",
      logout: "/",
      callback: false,
      home: "/middleware"
    },
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "access_token",
          maxAge: 60 * 60 * 24 * 7
          // type: 'Bearer'
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 7
          // data: "refresh_token",
        },

        endpoints: {
          login: {
            url: `${BASE_URL}/auth/login`,
            method: "post",
            propertyName: "access_token"
          },
          refresh: {
            url: `${BASE_URL}/auth/refresh_token`,
            method: "post"
          },
          logout: { url: `${BASE_URL}/auth/logout`, method: "get" },
          user: false
        }
      }
    }
  },
  router: {
    middleware: ["auth"]
  }
};
