const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/products');
const auth = require('../middleware/auth');
const checkPermission = require('../middleware/role');

router.post('/', auth, checkPermission('Products', 'create'), createProduct);
router.get('/', auth, checkPermission('Products', 'read'), getProducts);
router.put('/:id', auth, checkPermission('Products', 'update'), updateProduct);
router.delete('/:id', auth, checkPermission('Products', 'delete'), deleteProduct);

module.exports = router;