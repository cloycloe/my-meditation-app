// src/utils/api.js or src/api/api.js
import axios from "axios";

// URL of your backend API
const API_URL = "http://localhost:5000/api/auth";

// Signup function to make a POST request
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      username,
      email,
      password,
    });

    return response.data; // Assuming the backend sends the token or user data
  } catch (error) {
    throw new Error("Signup failed: " + error.response.data.message);
  }
};
