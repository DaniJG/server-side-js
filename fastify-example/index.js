const fastify = require('./server/app');
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