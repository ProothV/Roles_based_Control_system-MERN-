import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import RoleList from '../components/roles/RoleList';
import RoleForm from '../components/roles/RoleForm';

const RoleManagement = () => {
  const [editRole, setEditRole] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (role) => {
    setEditRole(role);
  };

  const handleSuccess = async () => {
    setEditRole(null);
    setRefresh(!refresh);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Role Management
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <RoleForm editRole={editRole} onSuccess={handleSuccess} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RoleList onEdit={handleEdit} refresh={refresh} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default RoleManagement;