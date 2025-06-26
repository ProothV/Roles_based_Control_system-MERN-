import api from './api';

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/api/employees', employeeData);
    return response.data; // { message: "Employee created" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create employee');
  }
};

export const getEmployees = async () => {
  try {
    const response = await api.get('/api/employees');
    return response.data; // [{ id, name, department, role, salary, status, enterprise_id }, ...]
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch employees');
  }
};

export const updateEmployee = async (employeeId, updatedData) => {
  try {
    const response = await api.put(`/api/employees/${employeeId}`, updatedData);
    return response.data; // { message: "Employee updated" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update employee');
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await api.delete(`/api/employees/${employeeId}`);
    return response.data; // { message: "Employee deleted" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete employee');
  }
};

export const getEnterprises = async () => {
  const response = await api.get('/api/enterprises');
  return response.data; // [{ id: 1, name: "Acme Inc." }, ...]
};

