import axios from "axios";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://repofinder-backend.onrender.com/api";

export const searchRepos = (keyword, page = 1, perPage = 10) =>
  axios.post(`${API_URL}/search`, { keyword, page, perPage });

export const getRepos = (page = 1, perPage = 10) =>
  axios.get(`${API_URL}/repos?page=${page}&perPage=${perPage}`);
