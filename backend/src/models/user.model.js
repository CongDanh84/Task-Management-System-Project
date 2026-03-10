import pool from "../config/db.js";

export const UserModel = {

  async create({ name, email, password, role, avatar }) {

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, role, avatar)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        name,
        email,
        password,
        role,
        avatar || null
      ]
    );

    return result.rows[0];
  },


  async findByEmail(email) {

    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    return result.rows[0];
  }

};