const express = require('express');
const process = require('process');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello world!
  The current time is ${ new Date() }
  and I am running on the ${ process.platform } platform
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
