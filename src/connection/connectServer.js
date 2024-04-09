import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://26.1.73.214:5000";

export const socket = io(URL);
