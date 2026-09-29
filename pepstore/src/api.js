import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/pepstore-api",
  withCredentials: true,
});

export default api;