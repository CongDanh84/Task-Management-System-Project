import { getCommentsByTask, createComment } from "../models/comment.model.js";
import { createNotification } from "../models/notification.model.js";

// GET COMMENTS BY TASK
export const getComments = async (req, res) => {
  try {

    const { taskId } = req.params;

    const data = await getCommentsByTask(taskId);

    res.json(data);

  } catch (err) {
    console.error("GET COMMENTS ERROR:", err);
    res.status(500).json({ message: "Fetch comments failed" });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {

    const { taskId, userId, content, assigneeId } = req.body;

    // save comment
    await createComment(taskId, userId, content);

    // create notification for task assignee
    if (assigneeId && assigneeId !== userId) {

      console.log("assigneeId:", assigneeId);
      console.log("userId:", userId);

      await createNotification(
        assigneeId,
        "Someone commented on your task"
      );

    }

    res.json({
      message: "Comment added"
    });

  } catch (err) {
    console.error("ADD COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};