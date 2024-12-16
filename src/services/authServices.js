import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
