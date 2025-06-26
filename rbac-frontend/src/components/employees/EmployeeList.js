import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../../Services/employeeService';
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

const EmployeeList = ({ onEdit, refresh }) => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const handleEdit = (employee) => {
    if (onEdit) onEdit(employee);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete employee');
      }
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 9 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'department', headerName: 'Department', width: 130 },
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
        Employees
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
      ) : employees.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No employees found.
        </Typography>
      ) : (
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default EmployeeList;