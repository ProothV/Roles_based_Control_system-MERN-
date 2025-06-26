import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1">
            Placeholder for dashboard overview. Add widgets or charts here.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;