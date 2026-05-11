require('dotenv').config({ path: '.env.test' });

process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');

jest.mock('axios');
const axios = require('axios');

describe('Order Service API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/orders should return an array', async () => {
    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('POST /api/orders should create an order if user and product exist', async () => {
    // Mock axios to return success for user and product verification
    axios.get.mockResolvedValue({ data: {} });

    const res = await request(app)
      .post('/api/orders')
      .send({
        userId: 1,
        productId: 1,
        quantity: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.quantity).toBe(5);
  });

  it('POST /api/orders should fail if user does not exist', async () => {
    axios.get.mockRejectedValueOnce(new Error('User not found'));

    const res = await request(app)
      .post('/api/orders')
      .send({
        userId: 999,
        productId: 1,
        quantity: 5
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });
});
