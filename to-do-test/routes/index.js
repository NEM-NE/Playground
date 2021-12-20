/* eslint-disable import/no-import-module-exports */
const express = require('express');
const ProductController = require('../controllers/product.js');

const router = express.Router();

router.post('/', ProductController.createProduct);

module.exports = router;
