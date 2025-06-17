// services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Update with your backend API URL
});

export default api;