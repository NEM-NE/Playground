/* eslint-disable */
const httpMocks = require('node-mocks-http');
const productController = require('../../controllers/product.js');
const productModel = require('../../models/Product');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn();
let req;
let res;
let next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it('should have a createProduct Fun', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  it('should call ProductModel.create', () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it('성공적으로 데이터 전송이 잘 되었는가?', () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return josn body in res', () => {
    productModel.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});
