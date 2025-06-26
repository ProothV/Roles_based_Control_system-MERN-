import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getRoles, deleteRole } from '../../Services/roleService';

const RoleList = ({ onEdit, refresh }) => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const data = await getRoles();
        setRoles(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to fetch roles');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [refresh]);

  const handleEdit = (role) => {
    onEdit(role);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(id);
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete role');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Role Name', width: 200 },
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
    <Box sx={{ height: 400, width: '100%' }}>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : roles.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No roles available.
        </Typography>
      ) : (
        <DataGrid
          rows={roles}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default RoleList;