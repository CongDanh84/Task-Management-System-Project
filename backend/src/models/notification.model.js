import pool from "../config/db.js";

// CREATE NOTIFICATION
export const createNotification = async (userid, message) => {

  await pool.query(
    `
    INSERT INTO notifications (userid, message, isread, createdat)
    VALUES ($1, $2, false, NOW())
    `,
    [userid, message]
  );

};


// GET NOTIFICATIONS BY USER
export const getNotificationsByUser = async (userid) => {

  const result = await pool.query(
    `
    SELECT *
    FROM notifications
    WHERE userid = $1
    ORDER BY createdat DESC
    `,
    [userid]
  );

  return result.rows;

};


// MARK ONE NOTIFICATION READ
export const markNotificationRead = async (id) => {

  await pool.query(
    `
    UPDATE notifications
    SET isread = true
    WHERE id = $1
    `,
    [id]
  );

};


// MARK ALL NOTIFICATIONS READ
export const markAllNotificationsRead = async (userid) => {

  await pool.query(
    `
    UPDATE notifications
    SET isread = true
    WHERE userid = $1
    `,
    [userid]
  );

};