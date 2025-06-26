const express = require('express');
const router = express.Router();
const { createRole, getRoles, updateRole, deleteRole } = require('../controllers/roles');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Roles', 'create'), createRole);
router.get('/', auth, checkPermission('Roles', 'read'), getRoles);
router.put('/:id', auth, checkPermission('Roles', 'update'), updateRole);
router.delete('/:id', auth, checkPermission('Roles', 'delete'), deleteRole);

module.exports = router;