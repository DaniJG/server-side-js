const { beforeAll, afterAll } = require("@jest/globals");
const supertest = require('supertest');
const fastify = require('../../server/app.js');

describe('the server', () => {
  let request;
  beforeAll(async () => {
    await fastify.ready();
    request = supertest(fastify.server);
  });
  afterAll(done => {
    fastify.close(done);
  });

  test('GET / returns a helloworld plaintext', async done => {
    const res = await request
      .get('/')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200);

    expect(res.text).toMatch(/Hello world!\s+The current time is .*\s+and I am running on the .* platform/);
    done();
  });
});