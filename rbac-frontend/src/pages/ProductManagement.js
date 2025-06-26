import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductForm';

const ProductManagement = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSuccess = () => {
    setEditProduct(null);          // Reset form
    setRefresh((prev) => !prev);   // Trigger list refresh
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProductForm editProduct={editProduct} onSuccess={handleSuccess} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductList onEdit={handleEdit} refresh={refresh} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductManagement;