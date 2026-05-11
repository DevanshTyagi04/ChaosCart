require('dotenv').config({ path: '.env.test' });

process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const crypto = require('crypto');

describe('User Service API', () => {
  it('GET /health should return 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/users should return an array', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('POST /api/users should create a user', async () => {
    const uniqueId = crypto.randomUUID();
    const res = await request(app)
      .post('/api/users')
      .send({
        name: `Test User ${uniqueId}`,
        email: `test-${uniqueId}@example.com`
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toContain(uniqueId);
  });
});
