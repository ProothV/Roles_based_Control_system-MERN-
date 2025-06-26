import api from './api';

export const createEnterprise = async (enterpriseData) => {
  try {
    const response = await api.post('/api/enterprises', enterpriseData);
    return response.data; // { message: "Enterprise created" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create enterprise');
  }
};

export const getEnterprises = async () => {
  try {
    const response = await api.get('/api/enterprises');
    return response.data; // [{ id, name, location, contact_info }, ...]
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch enterprises');
  }
};

export const updateEnterprise = async (enterpriseId, updatedData) => {
  try {
    const response = await api.put(`/api/enterprises/${enterpriseId}`, updatedData);
    return response.data; // { message: "Enterprise updated" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update enterprise');
  }
};

export const deleteEnterprise = async (enterpriseId) => {
  try {
    const response = await api.delete(`/api/enterprises/${enterpriseId}`);
    return response.data; // { message: "Enterprise deleted" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete enterprise');
  }
};
