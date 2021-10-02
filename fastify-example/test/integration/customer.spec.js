const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const fastify = require('fastify')({ logger: false });
const app = require('../../server/app.js');

describe('the customer API', () => {
  let request;
  beforeAll(async () => {
    fastify.register(app);
    await fastify.ready();
    request = supertest(fastify.server);
  });
  afterAll(done => {
    fastify.close(done);
  });

  test('GET /customer returns a list of customers', async () => {
    const res = await request
      .get('/customer')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(res.body).toMatchObject([
      {id: '111', name: 'Foo'},
      {id: '222', name: 'Bar'}
    ]);
  });

  test('POST /customer can add a new customer', () => {
    return request
      .post('/customer')
      .send({id:'999', name:'test'})
      .expect(201);
  });

  test('POST /customer returns 400 when missing required property', async () => {
    const res = await request
      .post('/customer')
      .send({it: 'is missing required properties'})
      .expect(400);

    expect(res.body).toMatchObject({error: 'Bad Request', message: "body should have required property 'id'"});
  });

  test('GET /customer/:id returns customer by id', async () => {
    const res = await request
      .get('/customer/999')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(res.body).toMatchObject({id:'999', name:'test'});
  });

});