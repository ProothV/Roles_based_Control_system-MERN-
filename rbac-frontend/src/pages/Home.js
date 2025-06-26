import React, { useContext } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.username || 'User'}!
          </Typography>
          <Typography variant="body1">
            This is the RBAC System dashboard. Use the sidebar to navigate to different modules.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;