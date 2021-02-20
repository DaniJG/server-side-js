const express = require('express');
const process = require('process');
const customer = require('./customer');

const app = express();

app.use(express.json());
app.use('/customer', customer);

app.get('/',
  (req, res, next) => {
    // console.log('I am a middleware function invoked before the final handler!');
    next();
  },
  (req, res) => {
    res.send(`Hello world!
    The current time is ${ new Date() }
    and I am running on the ${ process.platform } platform
    `);
  });

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  next(err);
});

module.exports = app;
