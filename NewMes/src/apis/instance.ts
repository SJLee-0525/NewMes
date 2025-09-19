import axios from "axios";

export const instance = axios.create({
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export default instance;
