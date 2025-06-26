import api from './api';

// Create a new role
export const createRole = async (roleData) => {
  try {
    const response = await api.post('/api/roles', roleData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create role');
  }
};

// Get all roles
export const getRoles = async () => {
  try {
    const response = await api.get('/api/roles');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch roles');
  }
};

// Update a role by ID
export const updateRole = async (roleId, updatedData) => {
  try {
    const response = await api.put(`/api/roles/${roleId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update role');
  }
};

// Delete a role by ID
export const deleteRole = async (roleId) => {
  try {
    const response = await api.delete(`/api/roles/${roleId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete role');
  }
};