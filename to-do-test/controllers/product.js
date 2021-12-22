/* eslint-disable max-len */
const productModel = require('../models/Product.js');

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(200).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(201).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send('Not Found!');
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.status(200).json(product);
    } else res.status(404).send();
  } catch (error) {
    next(error);
  }
};
