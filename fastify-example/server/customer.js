let customers = [
  {id: '111', name: 'Foo'},
  {id: '222', name: 'Bar'}
];

const customerRoutes = async function (fastify, opts) {

  fastify.get('/', (req, reply) => {
    return customers;
  });

  fastify.get('/:id', (req, reply) => {
    const customer = customers.find(c => c.id === req.params.id);
    if (!customer) res.sendStatus(404);
    return customer;
  });

  fastify.post('/', (req, reply) => {
    customers = [...customers, req.body];
    reply.statusCode = 201;
    reply.send();
  });

};

module.exports = customerRoutes;
