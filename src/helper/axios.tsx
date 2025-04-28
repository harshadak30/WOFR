import axios from "axios";

export default axios.create({
  baseURL: "https://4ab7-2405-201-37-21d9-7d02-467c-4a0f-1aca.ngrok-free.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
