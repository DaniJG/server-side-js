const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const server = require('../../server/app.js');

describe('the server', () => {
  let request;
  beforeAll(() => {
    request = supertest(server);
  });
  afterAll(done => {
    server.close(done);
  });

  test('GET / returns a helloworld plaintext', async done => {
    const res = await request
      .get('/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200);

    expect(res.text).toMatch(/Hello world!\s+The current time is .*\s+and I am running on the .* platform/);
    done();
  });

  test('GET /whoami returns the user provided through a global hook and decorator', async done => {
    const res = await request
      .get('/whoami')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);

      expect(res.body).toMatchObject({name: 'Sofia'});
    done();
  });

});