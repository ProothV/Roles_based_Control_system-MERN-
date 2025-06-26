import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../Services/userService';
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

const UserList = ({ onEdit, refresh }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleEdit = (user) => {
    if (onEdit) onEdit(user);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete user');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
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
        Users
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
      ) : users.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No users found.
        </Typography>
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default UserList;