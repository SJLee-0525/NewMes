import axios from "axios";

export const instance = axios.create({
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
