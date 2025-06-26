// src/components/common/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'; // Add this import

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={Logo} alt="RBAC Logo" style={{ height: '40px', marginRight: '16px' }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          RBAC System
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/roles">
              Roles
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;