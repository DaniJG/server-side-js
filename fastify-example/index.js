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
const app = require('./server/app');

fastify.register(app);

const port = 3000;
const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();