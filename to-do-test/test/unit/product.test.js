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
  next = jest.fn();
});

// Create 메서드 테스트
describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  // controller에서 createProduct 메서드가 있는지 확인
  it('should have a createProduct Fun', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  // createProduct메서드가 호출 될 때 내부 메서드인 productModel.create가 호출됐는지 확인
  it('should call ProductModel.create', () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  // createProduct메서드가 호출 될 때 내부 메서드인 productModel.create가 호출됐는지 확인
  it('성공적으로 데이터 전송이 잘 되었는가?', async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  // createProduct메서드의 결과 값이 옳게 나왔는지 확인
  it('should return josn body in res', async () => {
    productModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  //에러 핸들링 올바르지 않은 값이 올 때
  it('should handle errors', async () => {
    const errorMessage = { message: 'Description property missing'};
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  }) 
});
