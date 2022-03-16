const { Router } = require('express');
const Character = require('../models/Aot');

module.exports = Router()
  .post('/', async (req, res) => {
    const character = await Character.insert({
      name: req.body.name,
      branch: req.body.branch,
    });

    res.send(character);
  })

  .get('/', async (req, res) => {
    const characters = await Character.findAll();
    res.send(characters);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const character = await Character.findById(req.params.id);
      res.send(character);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const character = await Character.updateById(req.params.id, req.body);
    res.send(character);
  })

  .delete('/:id', async (req, res) => {
    const character = await Character.deleteById(req.params.id);
    res.send(character);
  });
