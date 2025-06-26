import React, { useState, useEffect } from 'react';
import { getEnterprises } from '../../Services/enterpriseService';
import { createEmployee, updateEmployee } from '../../Services/employeeService';
import {
  Container,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import Button from '../common/Button';
import Input from '../common/Input';

const EmployeeForm = ({ editEmployee, onSuccess }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [enterpriseId, setEnterpriseId] = useState('');
  const [enterprises, setEnterprises] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getEnterprises().then(setEnterprises).catch(() => setError('Failed to load enterprises'));
  }, []);

  useEffect(() => {
    if (editEmployee) {
      setName(editEmployee.name || '');
      setDepartment(editEmployee.department || '');
      setRole(editEmployee.role || '');
      setSalary(editEmployee.salary?.toString() || '');
      setEnterpriseId(editEmployee.enterprise_id?.toString() || '');
    } else {
      setName('');
      setDepartment('');
      setRole('');
      setSalary('');
      setEnterpriseId('');
    }
  }, [editEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      department,
      role,
      salary: parseFloat(salary),
      status: 'Active',
      enterprise_id: enterpriseId || null,
    };

    try {
      if (editEmployee) {
        await updateEmployee(editEmployee.id, employeeData);
      } else {
        await createEmployee(employeeData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to save employee');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {editEmployee ? 'Edit Employee' : 'Create Employee'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <Input label="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <Input label="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Enterprise</InputLabel>
          <Select value={enterpriseId} onChange={(e) => setEnterpriseId(e.target.value)} label="Enterprise">
            {enterprises.map((enterprise) => (
              <MenuItem key={enterprise.id} value={enterprise.id}>
                {enterprise.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          {editEmployee ? 'Update' : 'Create'}
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;