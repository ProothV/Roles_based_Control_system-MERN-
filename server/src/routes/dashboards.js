const express = require('express');
const router = express.Router();
const { createDashboard, getDashboards, updateDashboard, deleteDashboard } = require('../controllers/dashboards');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Dashboards', 'create'), createDashboard);
router.get('/', auth, checkPermission('Dashboards', 'read'), getDashboards);
router.put('/:id', auth, checkPermission('Dashboards', 'update'), updateDashboard);
router.delete('/:id', auth, checkPermission('Dashboards', 'delete'), deleteDashboard);

module.exports = router;