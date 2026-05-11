require('dotenv').config({ path: '.env.test' });

process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const crypto = require('crypto');

describe('Product Service API', () => {
  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/products should return an array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('POST /api/products should create a product', async () => {
    const uniqueId = crypto.randomUUID().substring(0, 8);
    const res = await request(app)
      .post('/api/products')
      .send({
        name: `Test Product ${uniqueId}`,
        price: 99.99
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toContain(uniqueId);
  });
});
