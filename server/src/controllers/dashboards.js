const pool = require('../config/db');

const createDashboard = async (req, res) => {
  try {
    const { role_id, widget_data } = req.body;
    if (!role_id || !widget_data) {
      return res.status(400).json({ message: 'Role ID and widget data required' });
    }

    await pool.query(
      'INSERT INTO dashboards (role_id, widget_data) VALUES (?, ?)',
      [role_id, JSON.stringify(widget_data)]
    );

    res.status(201).json({ message: 'Dashboard created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating dashboard' });
  }
};

const getDashboards = async (req, res) => {
  try {
    const [dashboards] = await pool.query(
      'SELECT d.id, d.role_id, d.widget_data, r.name as role FROM dashboards d JOIN roles r ON d.role_id = r.id'
    );
    res.json(dashboards.map(d => ({ ...d, widget_data: JSON.parse(d.widget_data) })));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching dashboards' });
  }
};

const updateDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id, widget_data } = req.body;
    if (!role_id || !widget_data) {
      return res.status(400).json({ message: 'Role ID and widget data required' });
    }

    await pool.query(
      'UPDATE dashboards SET role_id = ?, widget_data = ? WHERE id = ?',
      [role_id, JSON.stringify(widget_data), id]
    );

    res.json({ message: 'Dashboard updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating dashboard' });
  }
};

const deleteDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM dashboards WHERE id = ?', [id]);
    res.json({ message: 'Dashboard deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting dashboard' });
  }
};

module.exports = { createDashboard, getDashboards, updateDashboard, deleteDashboard };