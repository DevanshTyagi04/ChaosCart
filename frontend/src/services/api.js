import axios from 'axios';

export const USERS_API = axios.create({
  baseURL: 'http://localhost:4001/api/users'
});

export const PRODUCTS_API = axios.create({
  baseURL: 'http://localhost:4002/api/products'
});

export const ORDERS_API = axios.create({
  baseURL: 'http://localhost:4003/api/orders'
});
