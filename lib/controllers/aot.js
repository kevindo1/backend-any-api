const { Router } = require('express');
const pool = require('../utils/pool');
// const Character = require('../models/Aot');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO aot(name, branch) VALUES ($1, $2) RETURNING *;',
    [req.body.name, req.body.branch]
  );

  // const character = new Character(rows[0]);
  const character = {
    id: 1,
    name: 'Eren Jaeger',
    branch: 'Survey Corps',
  };

  res.json(character);
});
