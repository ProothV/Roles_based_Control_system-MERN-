const pool = require('../config/db');

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      const [permissions] = await pool.query(
        'SELECT * FROM permissions WHERE role_id = ? AND module = ?',
        [req.user.roleId, module]
      );

      if (!permissions.length) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const permission = permissions[0];
      const actionMap = {
        read: permission.can_read,
        create: permission.can_create,
        update: permission.can_update,
        delete: permission.can_delete,
      };

      if (!actionMap[action]) {
        return res.status(403).json({ message: `No ${action} permission for ${module}` });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: 'Error checking permissions' });
    }
  };
};

module.exports = checkPermission;