import React, { useState, useEffect, use } from 'react';
import { createUser } from '../../Services/userService';
import { getRoles } from '../../Services/roleService';
import {Container,Typography,MenuItem,FormControl,InputLabel,Select,} from '@mui/material';
import Button from '../common/Button';
import Input from '../common/Input';

const UserForm = ({ editUser, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editUser) {
      setUsername(editUser.username);
      setPassword(editUser.password);
      setRoleId(editUser.role_id);
    }
  }, [editUser]);

  useEffect(() => {
    getRoles().then(setRoles).catch(() => setError('Failed to load roles'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username, password, role_id: roleId, enterprise_id: null });
      setUsername('');
      setPassword('');
      setRoleId('');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editUser ? 'Edit User' : 'Create User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select value={roleId} onChange={(e) => setRoleId(e.target.value)} label="Role">
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          {editUser ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;