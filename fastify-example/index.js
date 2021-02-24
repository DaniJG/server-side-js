// Note this file is not necessary when running the project using fastify-cli!
// Only if you want to run directly from node or a different tool like nodemon, would you need this file

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