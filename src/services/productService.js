import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const getProducts = async () => {
  return await axios.get(API_URL);
};

export const createProduct = async (productData) => {
  return await axios.post(API_URL, productData);
};

export const getProduct = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const readProduct = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateProduct = async (id, productData) => {
  return await axios.put(`${API_URL}/${id}`, productData);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
