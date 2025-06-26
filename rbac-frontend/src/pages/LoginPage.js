import React from 'react';
import Login from '../components/auth/Login';
import { Container, Box } from '@mui/material';

const LoginPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Login />
      </Box>
    </Container>
  );
};

export default LoginPage;