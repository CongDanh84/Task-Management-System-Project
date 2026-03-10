import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // CHECK EMAIL EXIST
    const check = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const id = uuidv4();
    const avatar = `https://i.pravatar.cc/150?u=${id}`;

    await pool.query(
      `
      INSERT INTO users (id, name, email, password, role, avatar)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [id, name, email, password, role, avatar]
    );

    res.status(201).json({ id, name, email, role, avatar });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Register failed" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    console.log("LOGIN REQUEST:", req.body);

    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT id, name, email, password, role, avatar
      FROM users
      WHERE email = $1 AND password = $2
      `,
      [email, password]
    );

    console.log("SQL RESULT:", result.rows);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// GET USERS
export const getUsers = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT id, name, email, role, avatar FROM users"
    );

    res.json(result.rows);

  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ message: "Fetch users failed" });
  }
};