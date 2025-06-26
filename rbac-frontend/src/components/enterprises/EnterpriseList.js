import React, { useState, useEffect } from 'react';
import { getEnterprises, deleteEnterprise } from '../../Services/enterpriseService';
import {
  Typography,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EnterpriseList = ({ onEdit, refresh }) => {
  const [enterprises, setEnterprises] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEnterprises = async () => {
    setLoading(true);
    try {
      const data = await getEnterprises();
      setEnterprises(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch enterprises');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnterprises();
  }, [refresh]);

  const handleEdit = (enterprise) => {
    if (onEdit) onEdit(enterprise);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enterprise?')) {
      try {
        await deleteEnterprise(id);
        setEnterprises((prev) => prev.filter((e) => e.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete enterprise');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Enterprise Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
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
        Enterprises
      </Typography>

      {error && <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : enterprises.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No enterprises available.
        </Typography>
      ) : (
        <DataGrid
          rows={enterprises}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default EnterpriseList;