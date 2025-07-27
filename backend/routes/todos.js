const express = require('express');
const router = express.Router();
const todos = require('../data/db');

router.get('/', (req, res) => {
  res.json(todos.getAll());
});

router.post('/', (req, res) => {
  const newTodo = todos.create(req.body.text);
  res.status(201).json(newTodo);
});

router.put('/:id', (req, res) => {
  const updated = todos.update(req.params.id, req.body.text);
  if (updated) return res.json(updated);
  res.status(404).json({ message: 'Not found' });
});

router.delete('/:id', (req, res) => {
  const deleted = todos.remove(req.params.id);
  if (deleted) return res.json(deleted);
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;
