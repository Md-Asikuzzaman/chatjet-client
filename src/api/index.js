import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("chatjet_profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.stringify(localStorage.getItem("chatjet_profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => api.post("/signin", formData);
export const signUp = (formData) => api.post("/signup", formData);
export const fetchUser = () => api.get("/users");

export const fetchMessage = () => api.get("/messages");
export const sendMessage = (formData) => api.post("/message", formData);
