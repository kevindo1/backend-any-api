const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');

describe('backend-any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an AoT characters', async () => {
    const res = await request(app)
      .post('/api/v1/aot')
      .send({ name: 'Eren Jaeger', branch: 'Survey Corps' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Eren Jaeger',
      branch: 'Survey Corps',
    });
  });
});
