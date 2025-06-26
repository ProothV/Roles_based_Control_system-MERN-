import React, { useEffect, useState } from 'react';
import { createEnterprise } from '../../Services/enterpriseService';
import { Container, Typography } from '@mui/material';
import Button from '../common/Button';
import Input from '../common/Input';

const EnterpriseForm = ({ editEnterprise, onSuccess }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editEnterprise) {
      setName(editEnterprise.name);
      setLocation(editEnterprise.location);
      setContactInfo(editEnterprise.contact_info);
    }
  }, [editEnterprise]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnterprise({ name, location, contact_info: contactInfo });
      setName('');
      setLocation('');
      setContactInfo('');
      setError('');
    } catch (err) {
      setError('Failed to create enterprise');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editEnterprise ? 'Edit Enterprise' : 'Create Enterprise'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          label="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth>
          {editEnterprise ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default EnterpriseForm;