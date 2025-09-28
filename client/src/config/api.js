// API Configuration
// This file centralizes all API endpoints and configuration

// Get environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const APP_NAME = import.meta.env.VITE_APP_NAME || 'E-commerce App';
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
const APP_ENV = import.meta.env.VITE_APP_ENV || 'development';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    CHECK_AUTH: `${API_BASE_URL}/api/auth/check-auth`,
  },

  // Shop Products
  SHOP_PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/api/shop/products/get`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/shop/products/get/${id}`,
  },

  // Cart
  CART: {
    ADD: `${API_BASE_URL}/api/shop/cart/add`,
    GET: (userId) => `${API_BASE_URL}/api/shop/cart/get/${userId}`,
    UPDATE: `${API_BASE_URL}/api/shop/cart/update-cart`,
    DELETE: (userId, productId) => `${API_BASE_URL}/api/shop/cart/${userId}/${productId}`,
  },

  // Orders
  ORDERS: {
    CREATE: `${API_BASE_URL}/api/shop/order/create`,
    CAPTURE: `${API_BASE_URL}/api/shop/order/capture`,
    GET_USER_ORDERS: (userId) => `${API_BASE_URL}/api/shop/order/list/${userId}`,
    GET_ORDER_DETAILS: (id) => `${API_BASE_URL}/api/shop/order/details/${id}`,
  },

  // Address
  ADDRESS: {
    ADD: `${API_BASE_URL}/api/shop/address/add`,
    GET: (userId) => `${API_BASE_URL}/api/shop/address/get/${userId}`,
    UPDATE: (userId, addressId) => `${API_BASE_URL}/api/shop/address/update/${userId}/${addressId}`,
    DELETE: (userId, addressId) => `${API_BASE_URL}/api/shop/address/delete/${userId}/${addressId}`,
  },

  // Reviews
  REVIEWS: {
    ADD: `${API_BASE_URL}/api/shop/review/add`,
    GET: (productId) => `${API_BASE_URL}/api/shop/review/${productId}`,
  },

  // Search
  SEARCH: {
    PRODUCTS: (keyword) => `${API_BASE_URL}/api/shop/search/${keyword}`,
  },

  // Admin Products
  ADMIN_PRODUCTS: {
    UPLOAD_IMAGE: `${API_BASE_URL}/api/admin/products/upload-image`,
    ADD: `${API_BASE_URL}/api/admin/products/add`,
    EDIT: (id) => `${API_BASE_URL}/api/admin/products/edit/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/admin/products/delete/${id}`,
    GET_ALL: `${API_BASE_URL}/api/admin/products/get`,
  },

  // Admin Orders
  ADMIN_ORDERS: {
    GET_ALL: `${API_BASE_URL}/api/admin/orders/get`,
    GET_DETAILS: (id) => `${API_BASE_URL}/api/admin/orders/details/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/admin/orders/update/${id}`,
  },

  // Features
  FEATURES: {
    ADD: `${API_BASE_URL}/api/common/feature/add`,
    GET: `${API_BASE_URL}/api/common/feature/get`,
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: APP_NAME,
  VERSION: APP_VERSION,
  ENV: APP_ENV,
  API_BASE_URL: API_BASE_URL,
  IS_DEVELOPMENT: APP_ENV === 'development',
  IS_PRODUCTION: APP_ENV === 'production',
};

// Default axios configuration
export const AXIOS_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function to log API calls in development
export const logApiCall = (method, url, data = null) => {
  if (APP_CONFIG.IS_DEVELOPMENT) {
    console.log(`🚀 API Call: ${method.toUpperCase()} ${url}`, data ? { data } : '');
  }
};

export default API_ENDPOINTS;

