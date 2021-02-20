const http = require('http');
const handler = require('./server-api');

module.exports = http.createServer(handler);