import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Roles', path: '/roles' },
    { text: 'Users', path: '/users' },
    { text: 'Enterprises', path: '/enterprises' },
    { text: 'Employees', path: '/employees' },
    { text: 'Products', path: '/products' },
    { text: 'Dashboards', path: '/dashboards' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240 } }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;