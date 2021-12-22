/* eslint-disable import/no-import-module-exports */
const express = require('express');
const ProductController = require('../controllers/product.js');

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
