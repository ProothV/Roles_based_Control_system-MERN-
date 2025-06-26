import React, { useState, useEffect } from 'react';
import { getDashboards } from '../../Services/dashboardService';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const DashboardList = ({ refresh , onView }) => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboards = async () => {
      setLoading(true);
      try {
        const data = await getDashboards();
        setDashboards(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch dashboards');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboards();
  }, [refresh]);

  const handleView = (id) => {
    if (onView) { 
      onView(id);
    }
    navigate(`/dashboards/view/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'role_id', headerName: 'Role ID', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="View Dashboard">
          <IconButton
            onClick={() => handleView(params.row.id)}
            size="small"
            color="primary"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 450, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Dashboards
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
      ) : dashboards.length === 0 ? (
        <Typography variant="body2" sx={{ mt: 2 }}>
          No dashboards available.
        </Typography>
      ) : (
        <DataGrid
          rows={dashboards}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      )}
    </Box>
  );
};

export default DashboardList;