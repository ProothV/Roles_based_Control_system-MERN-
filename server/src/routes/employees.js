const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employees');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Employees', 'create'), createEmployee);
router.get('/', auth, checkPermission('Employees', 'read'), getEmployees);
router.put('/:id', auth, checkPermission('Employees', 'update'), updateEmployee);
router.delete('/:id', auth, checkPermission('Employees', 'delete'), deleteEmployee);

module.exports = router;