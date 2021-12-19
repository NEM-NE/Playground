/* eslint-disable import/no-import-module-exports */
import express from 'express';
import ProductController from '../controllers/product.js';

const router = express.Router();

router.get('/', ProductController.getItems);

export default router;
