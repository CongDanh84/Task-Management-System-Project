import pool from "../config/db.js";

export const Project = {

  async create(name) {

    const result = await pool.query(
      `
      INSERT INTO projects (name)
      VALUES ($1)
      RETURNING *
      `,
      [name]
    );

    return result.rows[0];
  },

  async getAll() {

    const result = await pool.query(
      `SELECT * FROM projects`
    );

    return result.rows;
  },

  async getById(id) {

    const result = await pool.query(
      `
      SELECT *
      FROM projects
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0];
  },

  async update(id, name) {

    const result = await pool.query(
      `
      UPDATE projects
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [name, id]
    );

    return result.rows[0];
  },

  async delete(id) {

    await pool.query(
      `
      DELETE FROM projects
      WHERE id = $1
      `,
      [id]
    );

    return { message: "Project deleted successfully" };
  }

};