const express = require('express');
const router = express.Router();
const { createEnterprise, getEnterprises, updateEnterprise, deleteEnterprise } = require('../controllers/enterprises');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Enterprises', 'create'), createEnterprise);
router.get('/', auth, checkPermission('Enterprises', 'read'), getEnterprises);
router.put('/:id', auth, checkPermission('Enterprises', 'update'), updateEnterprise);
router.delete('/:id', auth, checkPermission('Enterprises', 'delete'), deleteEnterprise);

module.exports = router;