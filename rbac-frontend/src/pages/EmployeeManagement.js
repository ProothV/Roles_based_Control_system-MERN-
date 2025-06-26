import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import EmployeeList from '../components/employees/EmployeeList';
import EmployeeForm from '../components/employees/EmployeeForm';

const EmployeeManagement = () => {
  const [editEmployee, setEditEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false);

  
  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleSuccess = () => {
    setEditEmployee(null);
    setRefresh(!refresh); // Trigger refresh of EmployeeList
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Employee Management
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <EmployeeForm editEmployee={editEmployee} onSuccess={handleSuccess} />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeList onEdit={handleEdit} refresh={refresh} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default EmployeeManagement;