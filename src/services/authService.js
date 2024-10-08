import axios from 'axios';

const API_URL = 'https://capstone-backend-1jax.onrender.com/api/auth';

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const register = async (username, email, password) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};
