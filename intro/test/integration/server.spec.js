const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const server = require('../../server');

describe('the server', () => {
  let request;
  beforeAll(() => {
    server.listen(0);
    request = supertest(server);
  });
  afterAll(done => {
    server.close(done);
  });

  test('GET / returns a helloworld plaintext', async () => {
    const res = await request
      .get('/')
      .expect('Content-Type', 'text/plain')
      .expect(200);

    expect(res.text).toMatch(/Hello world!\s+The current time is .*\s+and I am running on the .* platform/);
  });
});