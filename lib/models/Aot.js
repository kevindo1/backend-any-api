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
};
