import React, { useState } from 'react';
import { Container, Typography, Box, IconButton } from '@mui/material';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import DashboardList from '../components/dashboards/DashboardList';
import DashboardView from '../components/dashboards/DashboardView';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DashboardManagement = () => {
  const [selectedDashboardId, setSelectedDashboardId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleView = (id) => {
    setSelectedDashboardId(id);
  };

  const handleBack = () => {
    setSelectedDashboardId(null);
    setRefresh((prev) => !prev); // trigger refresh when returning
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard Management
          </Typography>

          {selectedDashboardId ? (
            <>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">Viewing Dashboard ID: {selectedDashboardId}</Typography>
              </Box>
              <DashboardView dashboardId={selectedDashboardId} />
            </>
          ) : (
            <DashboardList refresh={refresh} onView={handleView} />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardManagement;