import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../Services/productService';
import { getEnterprises } from '../../Services/enterpriseService';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Button from '../common/Button';
import Input from '../common/Input';

const ProductForm = ({ editProduct, onSuccess }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [enterpriseId, setEnterpriseId] = useState('');
  const [enterprises, setEnterprises] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEnterprises()
      .then(setEnterprises)
      .catch(() => setError('Failed to load enterprises'));
  }, []);

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name || '');
      setSku(editProduct.sku || '');
      setPrice(editProduct.price?.toString() || '');
      setCategory(editProduct.category || '');
      setEnterpriseId(editProduct.enterprise_id?.toString() || '');
    } else {
      setName('');
      setSku('');
      setPrice('');
      setCategory('');
      setEnterpriseId('');
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      sku,
      price: parseFloat(price),
      category,
      status: editProduct?.status || 'In Stock',
      enterprise_id: enterpriseId || null,
    };

    try {
      if (editProduct) {
        await updateProduct(editProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      if (onSuccess) onSuccess();
      setError('');
    } catch (err) {
      setError('Failed to save product');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editProduct ? 'Edit Product' : 'Create Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Stock Keeping Unit" value={sku} onChange={(e) => setSku(e.target.value)} />
        <Input
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Enterprise</InputLabel>
          <Select
            value={enterpriseId}
            onChange={(e) => setEnterpriseId(e.target.value)}
            label="Enterprise"
          >
            {enterprises.map((enterprise) => (
              <MenuItem key={enterprise.id} value={enterprise.id}>
                {enterprise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth>
          {editProduct ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;