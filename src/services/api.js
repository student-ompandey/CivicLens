import axios from 'axios';

// If deploying to Render with both front and back on the same server, use '/api'
// Otherwise fallback to whatever the local ENV dictates.
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to append JWT Token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, routing to login...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
};

export const complaintService = {
  getAll: () => api.get('/complaints'),
  getMy: () => api.get('/complaints/me'),
  create: (formData) => api.post('/complaints', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  updateStatus: (id, status) => api.patch(`/complaints/${id}/status`, { status }),
  upvote: (id) => api.put(`/complaints/${id}/vote`),
  delete: (id) => api.delete(`/complaints/${id}`)
};

export const profileService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (formData) => api.put('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export default api;
