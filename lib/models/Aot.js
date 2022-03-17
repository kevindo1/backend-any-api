const res = require('express/lib/response');
const pool = require('../utils/pool');

module.exports = class Character {
  id;
  name;
  branch;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.branch = row.branch;
  }

  static async insert({ name, branch }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          aot(name, branch)
        VALUES
          ($1, $2)
        RETURNING
          *
        `,
      [name, branch]
    );
    const character = new Character(rows[0]);
    return character;
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT 
          * 
        FROM 
          aot;
      `
    );
    const character = rows.map((row) => new Character(row));
    return character;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          aot
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;

    return new Character(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingCharacter = await Character.findById(id);
    const updatedAttributes = { ...existingCharacter, ...attributes };
    const { name, branch } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        aot
      SET
        name=$1,
        branch=$2
      WHERE
        id=$3
      RETURNING
        *
      `,
      [name, branch, id]
    );

    return new Character(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM 
        aot
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );
    return new Character(rows[0]);
  }
};
