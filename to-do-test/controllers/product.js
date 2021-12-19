const productModel = require('../models/Product.js');

exports.createProduct = (req, res, next) => {
  const createdProduct = productModel.create(req.body);
  res.status(200).json(createdProduct);
};
