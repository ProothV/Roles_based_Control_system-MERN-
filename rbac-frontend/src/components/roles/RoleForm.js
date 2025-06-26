import React, { useState, useEffect } from 'react';
import { createRole, updateRole } from '../../Services/roleService';
import { Container, Typography, FormGroup, FormControlLabel, Checkbox, TextField } from '@mui/material';
import Button from '../common/Button';

const RoleForm = ({ editRole, onSuccess }) => {
  const [name, setName] = useState('');
  const [module, setModule] = useState('Users');
  const [permissions, setPermissions] = useState({
    can_read: false,
    can_create: false,
    can_update: false,
    can_delete: false,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editRole) {
      setName(editRole.name);
      const perm = editRole.permissions?.[0];
      if (perm) {
        setModule(perm.module);
        setPermissions({
          can_read: perm.can_read,
          can_create: perm.can_create,
          can_update: perm.can_update,
          can_delete: perm.can_delete,
        });
      }
    } else {
      setName('');
      setPermissions({
        can_read: false,
        can_create: false,
        can_update: false,
        can_delete: false,
      });
    }
  }, [editRole]);

  const handlePermissionChange = (e) => {
    setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      name,
      permissions: [
        {
          module,
          ...permissions,
        },
      ],
    };

    try {
      if (editRole) {
        await updateRole(editRole.id, roleData);
      } else {
        await createRole(roleData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to submit');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editRole ? 'Edit Role' : 'Create Role'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Role Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Module"
          fullWidth
          margin="normal"
          value={module}
          onChange={(e) => setModule(e.target.value)}
        />
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={permissions.can_read} onChange={handlePermissionChange} name="can_read" />} label="Read" />
          <FormControlLabel control={<Checkbox checked={permissions.can_create} onChange={handlePermissionChange} name="can_create" />} label="Create" />
          <FormControlLabel control={<Checkbox checked={permissions.can_update} onChange={handlePermissionChange} name="can_update" />} label="Update" />
          <FormControlLabel control={<Checkbox checked={permissions.can_delete} onChange={handlePermissionChange} name="can_delete" />} label="Delete" />
        </FormGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          {editRole ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default RoleForm;