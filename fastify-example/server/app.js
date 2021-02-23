const fastify = require('fastify')({ logger: true });
const process = require('process');

fastify.get('/', async (request, reply) => {
  return `Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform`;
});

module.exports = fastify;