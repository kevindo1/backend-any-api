const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');
const Character = require('../lib/models/Aot');

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

  it('should get a list of AoT characters', async () => {
    const character1 = await Character.insert({
      name: 'Eren Jaeger',
      branch: 'Survey Corps',
    });
    const character2 = await Character.insert({
      name: 'Mikasa Akerman',
      branch: 'Survey Corps',
    });
    const res = await request(app).get(`/api/v1/aot`);
    expect(res.body).toEqual(expect.arrayContaining([character1, character2]));
  });

  it('should get a list of AoT characters by id', async () => {
    const character = await Character.insert({
      name: 'Eren Jaeger',
      branch: 'Survey Corps',
    });
    const res = await request(app).get(`/api/v1/aot/${character.id}`);

    expect(res.body).toEqual(character);
  });

  it('should edit AoT characters', async () => {
    const character = await Character.insert({
      name: 'Eren Jaeger',
      branch: 'Titan',
    });
    const res = await request(app)
      .patch(`/api/v1/aot/1`)
      .send({ branch: 'Titan' });

    expect(res.body).toEqual(character);
  });

  it('should delete AoT character', async () => {
    const character = await Character.insert({
      name: 'Eren Jaeger',
      branch: 'Titan',
    });
    const res = await request(app).delete(`/api/v1/aot/${character.id}`);

    expect(res.body).toEqual(character);
  });
});
