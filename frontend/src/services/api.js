import axios from 'axios';

export const USERS_API = axios.create({
  baseURL: 'http://13.234.231.164:4001/api/users'
});

export const PRODUCTS_API = axios.create({
  baseURL: 'http://13.234.231.164:4002/api/products'
});

export const ORDERS_API = axios.create({
  baseURL: 'http://13.234.231.164:4003/api/orders'
});