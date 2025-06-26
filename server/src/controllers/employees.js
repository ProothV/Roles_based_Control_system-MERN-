const pool = require('../config/db');

const createEmployee = async (req, res) => {
  try {
    const { name, department, role, salary, status, enterprise_id } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Employee name is required' });
    }

    // Optional: check if enterprise_id is a valid number or null
    const validEnterpriseId =
      enterprise_id === null || enterprise_id === '' ? null : Number(enterprise_id);

    if (enterprise_id && isNaN(validEnterpriseId)) {
      return res.status(400).json({ message: 'Invalid enterprise ID' });
    }

    await pool.query(
      'INSERT INTO employees (name, department, role, salary, status, enterprise_id) VALUES (?, ?, ?, ?, ?, ?)',
      [
        name,
        department || null,
        role || null,
        salary !== '' ? parseFloat(salary) : null,
        status || 'Active',
        validEnterpriseId,
      ]
    );

    res.status(201).json({ message: 'Employee created' });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query(
      'SELECT e.*, en.name as enterprise FROM employees e LEFT JOIN enterprises en ON e.enterprise_id = en.id'
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, role, salary, status, enterprise_id } = req.body;
    if (!name || !enterprise_id) {
      return res.status(400).json({ message: 'Name and enterprise ID required' });
    }

    await pool.query(
      'UPDATE employees SET name = ?, department = ?, role = ?, salary = ?, status = ?, enterprise_id = ? WHERE id = ?',
      [name, department || null, role || null, salary || null, status || null, enterprise_id, id]
    );

    res.json({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };