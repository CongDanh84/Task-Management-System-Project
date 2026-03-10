import pool from "../config/db.js";

export const createSubtask = async (subtask) => {

  await pool.query(
    `
    INSERT INTO subtasks ("taskId", title, status, "startDate", deadline)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [
      subtask.taskId,
      subtask.title,
      subtask.status,
      subtask.startDate,
      subtask.deadline
    ]
  );

};


export const getSubtasksByTask = async (taskId) => {

  const result = await pool.query(
    `
    SELECT *
    FROM subtasks
    WHERE "taskId" = $1
    ORDER BY "startDate"
    `,
    [taskId]
  );

  return result.rows;

};


export const updateSubtaskStatus = async (id, status) => {

  await pool.query(
    `
    UPDATE subtasks
    SET status = $1
    WHERE id = $2
    `,
    [status, id]
  );

};


export const deleteSubtask = async (id) => {

  await pool.query(
    `
    DELETE FROM subtasks
    WHERE id = $1
    `,
    [id]
  );

};