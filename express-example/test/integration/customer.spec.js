const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const server = require('../../server/app.js');

describe('the customer API', () => {
  let request;
  let listener;
  beforeAll(() => {
    listener = server.listen(0);
    request = supertest(listener);
  });
  afterAll(done => {
    listener.close(done);
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

  test('GET /customer/:id returns customer by id', async () => {
    const res = await request
      .get('/customer/999')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');

    expect(res.body).toMatchObject({id:'999', name:'test'});
  });

});