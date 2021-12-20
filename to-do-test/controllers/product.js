const productModel = require('../models/Product.js');

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(200).json(createdProduct);
  } catch (error) {
    next(error);
  }
};
