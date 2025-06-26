const bcrypt = require('bcrypt');
const pool = require('../config/db');

const createUser = async (req, res) => {
  try {
    const { username, password, role_id, enterprise_id } = req.body;
    if (!username || !password || !role_id) {
      return res.status(400).json({ message: 'Username, password, and role required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password, role_id, enterprise_id) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, role_id, enterprise_id || null]
    );

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

const getUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT u.id, u.username, r.name as role, e.name as enterprise ' +
      'FROM users u LEFT JOIN roles r ON u.role_id = r.id ' +
      'LEFT JOIN enterprises e ON u.enterprise_id = e.id'
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, role_id, enterprise_id } = req.body;
    if (!username || !role_id) {
      return res.status(400).json({ message: 'Username and role required' });
    }

    const updates = { username, role_id, enterprise_id: enterprise_id || null };
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    await pool.query(
      'UPDATE users SET username = ?, password = ?, role_id = ?, enterprise_id = ? WHERE id = ?',
      [updates.username, updates.password || null, updates.role_id, updates.enterprise_id, id]
    );

    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };