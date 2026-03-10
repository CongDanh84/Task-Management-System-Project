import pool from "../config/db.js";

export const getCommentsByTask = async (taskId) => {

  const result = await pool.query(
    `
    SELECT c.*, u.name
    FROM comments c
    JOIN users u ON c."userId" = u.id
    WHERE c."taskId" = $1
    ORDER BY c."createdAt" ASC
    `,
    [taskId]
  );

  return result.rows;
};


export const createComment = async (taskId, userId, content) => {

  await pool.query(
    `
    INSERT INTO comments ("taskId", "userId", content)
    VALUES ($1, $2, $3)
    `,
    [taskId, userId, content]
  );

};