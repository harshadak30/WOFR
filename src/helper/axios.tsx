import axios from "axios";

export default axios.create({
  // baseURL: "https://3dfa-2405-201-37-21d9-f197-4d8d-a7b3-142e.ngrok-free.app/",
  baseURL:"http://192.168.29.82:8001/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});
