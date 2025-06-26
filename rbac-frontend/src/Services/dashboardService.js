import api from './api';

export const createDashboard = async (dashboardData) => {
  try {
    const response = await api.post('/api/dashboards', dashboardData);
    return response.data; // { message: "Dashboard created" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create dashboard');
  }
};

export const getDashboards = async () => {
  try {
    const response = await api.get('/api/dashboards');
    return response.data; // [{ id, role_id, widgets }, ...]
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch dashboards');
  }
};

export const updateDashboard = async (dashboardId, updatedData) => {
  try {
    const response = await api.put(`/api/dashboards/${dashboardId}`, updatedData);
    return response.data; // { message: "Dashboard updated" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update dashboard');
  }
};

export const deleteDashboard = async (dashboardId) => {
  try {
    const response = await api.delete(`/api/dashboards/${dashboardId}`);
    return response.data; // { message: "Dashboard deleted" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete dashboard');
  }
};