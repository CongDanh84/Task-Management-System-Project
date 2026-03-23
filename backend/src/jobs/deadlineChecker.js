import cron from "node-cron";
import pool from "../config/db.js";
import { createNotification } from "../models/notification.model.js";

export const startDeadlineChecker = () => {

  // chạy mỗi ngày lúc 00:00
  cron.schedule("0 0 * * *", async () => {

    try {

      const result = await pool.query(`
        SELECT *
        FROM tasks
        WHERE DATE(deadline) < CURRENT_DATE
        AND deadlinenotified = false
        AND status != 'Done'
      `);

      const tasks = result.rows;

      for (const task of tasks) {

        if (task.assigneeid) {

          await createNotification(
            task.assigneeid,
            `Task "${task.title}" is overdue`
          );

        }

        await pool.query(
          `UPDATE tasks
           SET deadlinenotified = true
           WHERE id = $1`,
          [task.id]
        );

      }

      if (tasks.length > 0) {
        console.log("Deadline notifications sent:", tasks.length);
      }

    } catch (err) {

      console.error("Deadline checker error:", err);

    }

  });

};