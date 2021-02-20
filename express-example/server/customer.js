const express = require('express')
const router = express.Router()

let customers = [
  {id: '111', name: 'Foo'},
  {id: '222', name: 'Bar'}
];

router.get('/', (req, res) => {
  res.send(customers);
});

router.get('/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) res.sendStatus(404);
  res.send(customer);
});

router.post('/', (req, res) => {
  customers = [...customers, req.body];
  res.sendStatus(201);
});

module.exports = router;
