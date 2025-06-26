const pool = require('../config/db');

const createEnterprise = async (req, res) => {
  try {
    const { name, location, contact_info } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    await pool.query(
      'INSERT INTO enterprises (name, location, contact_info) VALUES (?, ?, ?)',
      [name, location || null, contact_info || null]
    );

    res.status(201).json({ message: 'Enterprise created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating enterprise' });
  }
};

const getEnterprises = async (req, res) => {
  try {
    const [enterprises] = await pool.query('SELECT * FROM enterprises');
    res.json(enterprises);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enterprises' });
  }
};

const updateEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, contact_info } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }

    await pool.query(
      'UPDATE enterprises SET name = ?, location = ?, contact_info = ? WHERE id = ?',
      [name, location || null, contact_info || null, id]
    );

    res.json({ message: 'Enterprise updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating enterprise' });
  }
};

const deleteEnterprise = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM enterprises WHERE id = ?', [id]);
    res.json({ message: 'Enterprise deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting enterprise' });
  }
};

module.exports = { createEnterprise, getEnterprises, updateEnterprise, deleteEnterprise };