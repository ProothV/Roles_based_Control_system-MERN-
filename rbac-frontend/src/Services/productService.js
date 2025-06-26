import api from './api';

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/api/products', productData);
    return response.data; // { message: "Product created" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create product');
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data; // [{ id, name, sku, price, category, status, enterprise_id }, ...]
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await api.put(`/api/products/${productId}`, updatedData);
    return response.data; // { message: "Product updated" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/api/products/${productId}`);
    return response.data; // { message: "Product deleted" }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};