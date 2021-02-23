const fastify = require('fastify')({ logger: true });
const process = require('process');
const customer = require('./customer');

fastify.get('/', async (request, reply) => {
  return `Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform`;
});

fastify.register(customer, { prefix: '/customer' });

module.exports = fastify;