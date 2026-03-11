import pool from "../config/db.js";

export const getCommentsByTask = async (taskId) => {

  const result = await pool.query(
    `
    SELECT c.*, u.name
    FROM comments c
    JOIN users u ON c."userid" = u.id
    WHERE c."taskid" = $1
    ORDER BY c."createdat" ASC
    `,
    [taskId]
  );

  return result.rows;
};


export const createComment = async (taskId, userId, content) => {

  await pool.query(
    `
    INSERT INTO comments ("taskid", "userid", content)
    VALUES ($1, $2, $3)
    `,
    [taskId, userId, content]
  );

};