const pool = require('../config/db');

// Create a new role with permissions (with transaction)
const createRole = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { name, permissions } = req.body;

    if (!name || !Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({ message: 'Name and permissions are required' });
    }

    await connection.beginTransaction();

    const [roleResult] = await connection.query('INSERT INTO roles (name) VALUES (?)', [name]);
    const roleId = roleResult.insertId;

    for (const perm of permissions) {
      await connection.query(
        'INSERT INTO permissions (role_id, module, can_read, can_create, can_update, can_delete) VALUES (?, ?, ?, ?, ?, ?)',
        [
          roleId,
          perm.module,
          perm.can_read || false,
          perm.can_create || false,
          perm.can_update || false,
          perm.can_delete || false,
        ]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Role created', roleId });
  } catch (err) {
    await connection.rollback();
    console.error('Error creating role:', err);
    res.status(500).json({ message: 'Error creating role' });
  } finally {
    connection.release();
  }
};

// Get all roles with their permissions
const getRoles = async (req, res) => {
  try {
    const [roles] = await pool.query('SELECT * FROM roles');
    const [permissions] = await pool.query('SELECT * FROM permissions');

    const rolesWithPermissions = roles.map((role) => ({
      ...role,
      permissions: permissions.filter((perm) => perm.role_id === role.id),
    }));

    res.json(rolesWithPermissions);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).json({ message: 'Error fetching roles' });
  }
};

// Update a role and its permissions
const updateRole = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    if (!name || !Array.isArray(permissions) || permissions.length === 0) {
      return res.status(400).json({ message: 'Name and permissions are required' });
    }

    await connection.beginTransaction();

    await connection.query('UPDATE roles SET name = ? WHERE id = ?', [name, id]);
    await connection.query('DELETE FROM permissions WHERE role_id = ?', [id]);

    for (const perm of permissions) {
      await connection.query(
        'INSERT INTO permissions (role_id, module, can_read, can_create, can_update, can_delete) VALUES (?, ?, ?, ?, ?, ?)',
        [
          id,
          perm.module,
          perm.can_read || false,
          perm.can_create || false,
          perm.can_update || false,
          perm.can_delete || false,
        ]
      );
    }

    await connection.commit();
    res.json({ message: 'Role updated' });
  } catch (err) {
    await connection.rollback();
    console.error('Error updating role:', err);
    res.status(500).json({ message: 'Error updating role' });
  } finally {
    connection.release();
  }
};

// Delete a role and its permissions
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid role ID' });
    }

    await pool.query('DELETE FROM permissions WHERE role_id = ?', [id]);
    await pool.query('DELETE FROM roles WHERE id = ?', [id]);

    res.json({ message: 'Role deleted' });
  } catch (err) {
    console.error('Error deleting role:', err);
    res.status(500).json({ message: 'Error deleting role' });
  }
};

module.exports = {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
};