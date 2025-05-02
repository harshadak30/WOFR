import axios from "axios";

export default axios.create({
  baseURL: "https://5394-2405-201-37-21d9-cd0f-4591-7d6b-c3e2.ngrok-free.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
