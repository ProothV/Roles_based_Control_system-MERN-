import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { login as loginService } from '../../Services/authService';
import { Container, Typography } from '@mui/material';
import Button from '../common/Button';
import Input from '../common/Input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginService(username, password);
      login(token, { username });
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;