/* eslint-disable */
const httpMocks = require('node-mocks-http');
const productController = require('../../controllers/product.js');
const productModel = require('../../models/Product');
const newProduct = require('../data/new-product.json');
const allProduct = require('../data/all-product.json');
const updateProduct = require('../data/update-product.json');

productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

let req;
let res;
let next;
const productId = "5diijfdsijdfhuehwufwe";

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Create 메서드 테스트
/*

  1. 험수가 있는지 확인
  2. 함수 내부에 있는 메서드들이 제대로 실행되는지 확인
  3. 응답 코드 확인
  4. 올바른 값을 반환하는지 확인
  5. 에러처리 확인

*/
describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  // controller에서 createProduct 메서드가 있는지 확인
  it('should have a createProduct Fun', () => {
    expect(typeof productController.createProduct).toBe('function');
  });

  // createProduct메서드가 호출 될 때 내부 메서드인 productModel.create가 호출됐는지 확인
  it('should call ProductModel.create', async () => {
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  // createProduct메서드가 호출 될 때 올바른 결과가 나왔는지 확인
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

describe('Product Controller Get', () => {
  beforeEach(() => {
    req.body = {};
  });

  it('should have a getProducts Func', () => {
    expect(typeof productController.getProducts).toBe('function');
  })

  it('should call ProductModel.find', async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({});
  })

  it('성공적으로 전송이 되었는가?', async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('올바른 결과 값이 나오는가', async () => {
    productModel.find.mockReturnValue(allProduct);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProduct);
  })

  it('should handle error', async () => {
    const errorMessage = { message: 'error!!'};
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise);

    await productController.getProducts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  })
})

describe('Product Controller getbyId', () => {
  beforeEach(() => {
    req.body = 'productIdNumber'
  })

  it('함수가 존재하는가?', () => {
    expect(typeof productController.getProductById).toBe('function');
  })

  it('findbyid가 제대로 실행되는가?', async () => {
    req.params.id = productId;
    await productController.getProductById(req, res, next);
    expect(productModel.findById).toBeCalledWith(productId);
  })

  it('응답코드 확인', async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('올바른 값이 보내졌는가?', async () => {
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newProduct);
  })

  it('찾는 상품이 없을 때 404 에러가 뜨는가?', async () => {
    productModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('에러처리가 되는가?', async() => {
    const errorMessage = { message : 'invaild id' };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findById.mockReturnValue(rejectedPromise);
    
    await productController.getProductById(req, res, next);
    
    expect(next).toBeCalledWith(errorMessage);
  })
})

/*
  1. 함수가 존재하는가?
  2. 내부 함수가 제대로 동작하는가?
  3. 성공적인 경우 데이터가 잘 전달이 되는가?
  4. 업데이트 할 상품이 없다면 에러 처리
  5. 그냥 에러처리
*/
describe('PUT /api/product', () => {
  it('함수가 존재하는가?', () => {
    expect(typeof productController.updateProduct).toBe('function');
  });

  it('내부 함수가 제대로 호출되는가?', async () => {
    req.params.id = productId;
    req.body = updateProduct;
    await productController.updateProduct(req, res, next);
    expect(productModel.findByIdAndUpdate).toBeCalledWith(req.params.id, req.body, { new: true });
  });

  it('성공적으로 200번 넘버를 반환하는가?', async () => {
    req.params.id = productId;
    req.body = updateProduct;
    productModel.findByIdAndUpdate.mockReturnValue({
      "name": "computer",
      "description": "best computer",
      "price": 1300
    })

    await productController.updateProduct(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({
      "name": "computer",
      "description": "best computer",
      "price": 1300
    });
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('업데이트 할 상품이 없다면 404 에러 처리', async () => {
    req.params.id = "1241551512";
    req.body = updateProduct;
    productModel.findByIdAndUpdate.mockReturnValue(undefined);

    await productController.updateProduct(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('DB 에러 처리', async () => {
    const errorMessage = { message : 'DB Error!'};
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);

    await productController.updateProduct(req, res, next);
    
    expect(next).toBeCalledWith(errorMessage);
  });
  
})

/*
 1. 함수가 존재하는가?
 2. db.delete 메서드가 조건에 맞게 동작할 수 있도록 존재하는가?
 3. 실제로 성공적으로 반환하는가?
 4. 해당 아이디가 없는 경우 404
 5. 로직 에러가 발생한 경우 500
*/
describe('DELETE /api/product/:id ', () => {
  beforeEach(() => {
    req.params.id = 'idddd';
  })

  it('함수가 존재하는가?', () => {
    expect(typeof productController.deleteProduct).toBe('function');
  })

  it('db.delete 메서드가 조건에 맞게 동작할 수 있도록 존재하는가?', async () => {
    await productController.deleteProduct(req, res, next);

    expect(productModel.findByIdAndDelete).toBeCalledWith(req.params.id);
  })

  it('실제로 성공적으로 변환하는가?', async () => {
    productModel.findByIdAndDelete.mockReturnValue(newProduct);

    await productController.deleteProduct(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('해당 아이디가 없는 경우 404', async () => {
    productModel.findByIdAndDelete.mockReturnValue(undefined);

    await productController.deleteProduct(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('로직 에러가 발생한 경우 500', async () => {
    const errorMessage = { message : 'Server Error!' };
    const rejectedPromise = Promise.reject(errorMessage)
    productModel.findByIdAndDelete.mockReturnValue(rejectedPromise);

    await productController.deleteProduct(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  })

})