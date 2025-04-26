import axios from "axios";

export default axios.create({
  baseURL: "https://c697-2405-201-37-21d9-dc08-b022-5060-b783.ngrok-free.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
