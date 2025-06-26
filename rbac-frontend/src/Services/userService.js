import api from './api';

export const createUser = async (userData) => {
  try {
    const response = await api.post('/api/users', userData);
    return response.data; // { message: "User created" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data; // [{ id, username, role_id }, ...]
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/api/users/${userId}`, updatedData);
    return response.data; // { message: "User updated" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data; // { message: "User deleted" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};

export const getRoles = async () => {
  const response = await api.get('/api/roles');
  return response.data; // e.g. [{ id: 1, name: 'Admin' }, ...]
};
