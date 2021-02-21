const express = require('express');
const process = require('process');
const customer = require('./customer');

const app = express();

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method.toUpperCase()}: ${req.baseUrl}${req.path}`);
  next();
};

app.use(loggingMiddleware);
app.use(express.static('./public'));
app.use(express.json());
app.use('/customer', customer);

app.get('/sync-error', (req, res) => {
  throw new Error('Test the error handler');
});

const doSomethingAsync = () => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject('Test the error handler'), 1000));
};
app.get('/async-error-crash', async (req, res) => {
  await doSomethingAsync();
});

app.get('/async-error', async (req, res, next) => {
  try{
    await doSomethingAsync();
  }catch (err){
    next(err);
  }
});

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
const errorHandler = (err, req, res, next) => {
  console.log(`Ooops, something went wrong:`, err);
  next(err);
};
app.use(errorHandler);

module.exports = app;
