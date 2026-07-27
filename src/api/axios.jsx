import axios from "axios";
export const api = axios.create({
  baseURL: "https://letmegrab-quiz-app-backend.onrender.com/",
});
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    let token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
