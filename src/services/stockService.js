import axios from 'axios';

const API_URL = 'https://capstone-backend-1jax.onrender.com/api/stocks';

export const getStocks = async () => {
  return await axios.get(API_URL);
};

export const createStock = async (stockData) => {
  return await axios.post(API_URL, stockData);
};

export const getStock = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const readStock = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateStock = async (id, stockData) => {
  return await axios.put(`${API_URL}/${id}`, stockData);
};

export const deleteStock = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
