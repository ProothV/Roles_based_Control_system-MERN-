const express = require('express');
const router = express.Router();
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/users');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Users', 'create'), createUser);
router.get('/', auth, checkPermission('Users', 'read'), getUsers);
router.put('/:id', auth, checkPermission('Users', 'update'), updateUser);
router.delete('/:id', auth, checkPermission('Users', 'delete'), deleteUser);

module.exports = router;