


import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getOrders = async () => {
  return await axios.get(API_URL);
};

export const createOrder = async (productData) => {
  return await axios.post(API_URL, productData);
};

export const readOrder = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateOrder = async (id, productData) => {
  return await axios.put(`${API_URL}/${id}`, productData);
};

export const deleteOrder = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
