const fastify = require('fastify')({ logger: true });
// const fastify = require('fastify')({
//   logger: {
//     level: 'trace',
//     redact: ['hostname', 'req.headers.authorization'],
//     serializers: {
//       req (request) {
//         return {
//           method: request.method,
//           url: request.url,
//         }
//       }
//     }
//   }
// });

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
  request.log.info({extra: 'metadata'}, 'hello logger! %s', 'foo');
  return `Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform`;
});

fastify.get('/whoami', async (request, reply) => {
  return request.user;
});

fastify.register(customer, { prefix: '/customer' });

fastify.route({
method: 'GET',
path: '/response-serialization',
schema: {
  response: {
    '2xx': {
      name: { type: 'string' }
    }
  }
},
handler: (req, reply) => {
  return {name: 'Sofia', someSensitiveProperty:'foo', anotherProperty: 'bar'};
}
});

const loadDataFromDb = () => {
  return new Promise((resolve, reject) =>
    // setTimeout(() => reject(new Error('Something happened')), 1000));
    setTimeout(() => resolve({foo: 42, bar: 'baz'}), 1000));
};
fastify.get('/async-promises', (request, reply) => {
  return loadDataFromDb()
    .then(data => data); // could omit the .then completely, just to show it is a Promise
});
fastify.get('/dont-do-this', (request, reply) => {
  // this both returns a promise AND calls reply.send
  // the first one that happens is sent to the client, in this case {a:1} and the other is discarded
  return loadDataFromDb()
    .then(data => reply.send({a: 1}))
    .then(() => ({b: 2}));
});
fastify.get('/async-await', async (request, reply) => {
  const data = await loadDataFromDb();
  return data;
});

const loadDataFromDbCallback = done => {
  const error = null;
  setTimeout(() => done(error, {foo: 42, bar: 'baz'}), 1000);
};
fastify.get('/async-callback', (request, reply) => {
  loadDataFromDbCallback((err, data) => {
    if (err) reply.send(err);
    reply.send(data);
  });
});

// fastify.setErrorHandler(function (error, request, reply) {
//   console.log(`Found error: ${error}`);
//   reply.status(500).send(error)
// });

module.exports = fastify;