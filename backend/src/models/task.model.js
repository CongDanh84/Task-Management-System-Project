import pool from "../config/db.js";


// ================= GET ALL =================
export const getAllTasks = async () => {

  const result = await pool.query(
    `SELECT * FROM tasks`
  );

  return result.rows;

};


// ================= CREATE =================
export const createTask = async (
  projectId,
  title,
  description,
  assigneeId,
  creatorId,
  status,
  startDate,
  deadline
) => {

  const result = await pool.query(
    `
    INSERT INTO tasks
    (projectId, title, description, "assigneeid", "creatorid", status, "startdate", deadline)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
    [
      projectId,
      title,
      description,
      assigneeId,
      creatorId,
      status,
      startDate,
      deadline
    ]
  );

  return result.rows[0];
};


// ================= UPDATE =================
export const updateTask = async (
  id,
  title,
  description,
  assigneeId,
  status,
  startDate,
  deadline
) => {

  const result = await pool.query(
    `
    UPDATE tasks
    SET
      title = $1,
      description = $2,
      "assigneeid" = $3,
      status = $4,
      "startdate" = $5,
      deadline = $6
    WHERE id = $7
    RETURNING *
    `,
    [
      title,
      description,
      assigneeId,
      status,
      startDate,
      deadline,
      id
    ]
  );

  return result.rows[0];
};


// ================= DELETE =================
export const deleteTask = async (id) => {

  await pool.query(
    `
    DELETE FROM tasks
    WHERE id = $1
    `,
    [id]
  );

  return { message: "Task deleted successfully" };

};