let customers = [
  {id: '111', name: 'Foo'},
  {id: '222', name: 'Bar'}
];

const customerRoutes = async function (fastify, opts) {

  // fastify.addHook('onRequest', (request, reply, done) => {
  //   console.log(`${request.method.toUpperCase()}: ${request.url}`);
  //   done();
  // });

  fastify.get('/', (req, reply) => {
    return customers;
  });

  fastify.get('/:id', (req, reply) => {
    const customer = customers.find(c => c.id === req.params.id);
    if (!customer) res.sendStatus(404);
    return customer;
  });

  // Shorthand request declaration

  // fastify.post('/', (req, reply) => {
  //   customers = [...customers, req.body];
  //   reply.statusCode = 201;
  //   reply.send();
  // });

  // Generic request declaration including request schema/validation
  fastify.route({
    method: 'POST',
    path: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        },
        required: ['id', 'name']
      }
    },
    handler: (req, reply) => {
      customers = [...customers, req.body];
      reply.statusCode = 201;
      reply.send();
    }
  });

};

module.exports = customerRoutes;
