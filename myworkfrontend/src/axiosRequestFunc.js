import axios from "axios";
const BASE_URL = "http://localhost:8000/api/";
const TOKEN = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser).authToken : null;
const userId = JSON.parse(localStorage.getItem("persist:root")) != null && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser) != null ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)._id: null;
export const localRequest = axios.create({
  baseURL: BASE_URL,
});

export const clientRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  params: {
    userId: userId
  }
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});