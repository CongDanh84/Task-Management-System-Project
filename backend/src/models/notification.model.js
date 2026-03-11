import pool from "../config/db.js";

// CREATE NOTIFICATION
export const createNotification = async (userId, message) => {

  await pool.query(
    `
    INSERT INTO notifications ("userid", message, "isread", "createdat")
    VALUES ($1, $2, false, NOW())
    `,
    [userId, message]
  );

};


// GET NOTIFICATIONS BY USER
export const getNotificationsByUser = async (userId) => {

  const result = await pool.query(
    `
    SELECT *
    FROM notifications
    WHERE "userid" = $1
    ORDER BY "createdat" DESC
    `,
    [userId]
  );

  return result.rows;

};


// MARK ONE NOTIFICATION READ
export const markNotificationRead = async (id) => {

  await pool.query(
    `
    UPDATE notifications
    SET "isread" = true
    WHERE id = $1
    `,
    [id]
  );

};


// MARK ALL NOTIFICATIONS READ
export const markAllNotificationsRead = async (userId) => {

  await pool.query(
    `
    UPDATE notifications
    SET "isread" = true
    WHERE "userid" = $1
    `,
    [userId]
  );

};