export default {
  created() {
    // init socket event parser
    this.initSocketToVuexParser();
  },
  methods: {
    initSocketToVuexParser() {
      if (process.client) {
        const handlers = [];
        for (let action in this.$store._actions) {
          handlers.push({ name: action, store_handler: "dispatch" });
        }
        for (let mutation in this.$store._mutations) {
          handlers.push({ name: mutation, store_handler: "commit" });
        }
        handlers.forEach(handler => {
          if (handler.name.slice(0, 7) == "SOCKET_") {
            const event_name = handler.name.substr(7);
            this.$socket.on(event_name, data => {
              this.$store[handler.store_handler](handler.name, data);
            });
          }
        });
      }
    }
  }
};
