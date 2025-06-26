import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/USerForm';

const UserManagement = () => {
  const [editUser, setEditUser] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  const handleEdit = (user) => {
    setEditUser(user);
  }
  const handleSuccess = () => {
    setEditUser(null);          // Reset form
    setRefresh((prev) => !prev); // Trigger list refresh
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <UserForm editUser={editUser} onSuccess={handleSuccess} />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserList onEdit={handleEdit} refresh={refresh} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserManagement;