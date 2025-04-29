import axios from "axios";

export default axios.create({
  baseURL: "https://7973-2405-201-37-21d9-188d-8047-cd66-4110.ngrok-free.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
