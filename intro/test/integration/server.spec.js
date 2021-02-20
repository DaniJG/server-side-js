const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const server = require('../../server');

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
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain')
      .expect(200);

    expect(res.text).toMatch(/Hello world!\s+The current time is .*\s+and I am running on the .* platform/);
    done();
  });
});