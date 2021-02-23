const fastify = require('fastify')({ logger: true });
const process = require('process');
const port = 3000;

fastify.get('/', async (request, reply) => {
  return `Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform`;
});

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();