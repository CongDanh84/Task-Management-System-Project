import pool from "../config/db.js";

export const createSubtask = async (subtask) => {

  await pool.query(
    `
    INSERT INTO subtasks (taskid, title, status, startdate, deadline)
    VALUES ($1, $2, $3, $4, $5)
    `,
    [
      subtask.taskid,
      subtask.title,
      subtask.status,
      subtask.startDate,
      subtask.deadline
    ]
  );

};


export const getSubtasksByTask = async (taskid) => {

  const result = await pool.query(
    `
    SELECT *
    FROM subtasks
    WHERE taskid = $1
    ORDER BY "startdate"
    `,
    [taskid]
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