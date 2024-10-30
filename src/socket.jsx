// src/socket.js
import { io } from "socket.io-client";

const PORT = process.env.REACT_APP_SOCKET_PORT;
const socket = io(`http://localhost:${PORT}`, {
  transports: ["websocket"],
});

export default socket;
