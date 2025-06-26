import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import EnterpriseList from '../components/enterprises/EnterpriseList';
import EnterpriseForm from '../components/enterprises/EnterpriseForm';

const EnterpriseManagement = () => {
  const [editEnterprise, setEditEnterprise] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const handleEdit = (enterprise) => {
    setEditEnterprise(enterprise);
  };
  const handleSuccess = () => {
    setEditEnterprise(null);          // Reset form
    setRefresh((prev) => !prev);      // Trigger list refresh
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Enterprise Management
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <EnterpriseForm editEnterprise={editEnterprise} onSuccess={handleSuccess} />
            </Grid>
            <Grid item xs={12} md={6}>
              <EnterpriseList onEdit={handleEdit} refresh={refresh} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default EnterpriseManagement;