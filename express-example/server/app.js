const express = require('express');
const process = require('process');

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform
  `);
});

module.exports = app;
