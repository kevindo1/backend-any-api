const { Router } = require('express');
const Character = require('../models/Aot');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const character = await Character.insert({
      name: req.body.name,
      branch: req.body.branch,
    });

    res.json(character);
  })

  .get('/', async (req, res) => {
    const characters = await Character.findAll();
    res.json(characters);
  });
