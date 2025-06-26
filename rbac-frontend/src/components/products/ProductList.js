import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../Services/productService';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = ({ onEdit, refresh }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  const handleEdit = (product) => {
    if (onEdit) onEdit(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete product');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 1 },
    { field: 'name', headerName: 'Product Name', width: 120 },
    { field: 'sku', headerName: 'SKU', width: 120 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      valueFormatter: (params) =>
        params.value !== undefined && params.value !== null
          ? `₹${Number(params.value).toFixed(2)}`
          : '—',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)} size="small" sx={{ mr: 1 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)} size="small" color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ height: 450, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No products found.
        </Typography>
      ) : (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default ProductList;