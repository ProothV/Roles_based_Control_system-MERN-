import api from './api';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data; // { token }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};