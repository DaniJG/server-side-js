const fastify = require('fastify')({ logger: false });
const fp = require('fastify-plugin');
const process = require('process');
const customer = require('./customer');

const logging = async (fastifyInstance, opts) => {
  fastifyInstance.addHook('onRequest', (request, reply, done) => {
    console.log(`${request.method.toUpperCase()}: ${request.url}`);
    done();
  });
};

// This wont work, since the hook will only be invoked for routes declared INSIDE the plugin
//    fastify.register(logging);
// However sometimes you need to add behaviour to all request in express-middleware fashion.
// In those situations you wrap your plugin with the fastify-plugin utility, and it gets registered globally
fastify.register(fp(logging));

const userContext = async (fastifyInstance, opts) => {
  fastifyInstance.decorateRequest('user', null);
  fastifyInstance.addHook('onRequest', (request, reply, done) => {
    request.user = { name: 'Sofia' };
    done();
  });
};
fastify.register(fp(userContext));

fastify.get('/', async (request, reply) => {
  return `Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform`;
});

fastify.get('/whoami', async (request, reply) => {
  return request.user;
});

fastify.register(customer, { prefix: '/customer' });

module.exports = fastify;