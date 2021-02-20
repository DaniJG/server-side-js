const process = require('process');

module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform
  `);
};
