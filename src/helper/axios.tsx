import axios from "axios";

export default axios.create({
  baseURL: "https://8e6f-2405-201-37-21d9-529-1d4e-df4e-b5d2.ngrok-free.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
