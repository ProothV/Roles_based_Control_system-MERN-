import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper } from '@mui/material';

const DashboardView = () => {
  const { id } = useParams();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard View – Role ID: {id}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Users</Typography>
            <Typography variant="h6">123</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle2">Products</Typography>
            <Typography variant="h6">56</Typography>
          </Paper>
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
    </Container>
  );
};

export default DashboardView;