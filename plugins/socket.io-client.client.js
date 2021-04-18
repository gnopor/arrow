import { io } from "socket.io-client";

const baseUrl = process.env.baseUrl;
const socket = io(baseUrl);

export default ({ app }, inject) => {
  inject("socket", socket);
};

// Now $socket service can be accessed from context and
// this in pages, components, plugins, and store actions.
