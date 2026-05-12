import axios from 'axios';

export const USERS_API = axios.create({
  baseURL: '/api/users'
});

export const PRODUCTS_API = axios.create({
  baseURL: '/api/products'
});

export const ORDERS_API = axios.create({
  baseURL: '/api/orders'
});