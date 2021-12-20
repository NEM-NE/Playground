/* eslint-disable */
const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

let firstProduct;

/*
  1. 상태 코드 확인
  2. 제대로 들어왔는지 확인
    2-1. 타입
    2-2. 일부 값들
*/
it('POST /api/product', async () => {
  const response = await request(app)
    .post('/api/product')
    .send(newProduct);

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it('should return 500 on POST /api/product', async () => {
  const response = await request(app)
                    .post('/api/product')
                    .send({ name: "computer" })

  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual( { message: 'Product validation failed: description: Path `description` is required.'});
});

it('GET /api/product', async () => {
  const response = await request(app).get('/api/product');

  expect(response.statusCode).toBe(201);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
})

it('GET /api/product/:id', async () => {
  const response = await request(app).get(`/api/product/${firstProduct._id}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBeDefined();
  expect(response.body.description).toBeDefined();

})

it('NotFound error GET /api/product/:id', async () => {
  const response = await request(app).get(`/api/product/61c0325b29da909497942492`);

  expect(response.statusCode).toBe(404);
  expect(response.body.name).toBeUndefined();
  expect(response.body.description).toBeUndefined();

})