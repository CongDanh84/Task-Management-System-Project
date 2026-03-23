import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../models/task.model.js";
import { createNotification } from "../models/notification.model.js";


// ================= CREATE TASK =================
export const addTask = async (req, res) => {
  try {

    const {
      projectId,
      title,
      description,
      assigneeId,
      creatorId,
      status,
      startDate,
      deadline
    } = req.body;

    const result = await createTask(
      projectId,
      title,
      description,
      assigneeId,
      creatorId,
      status,
      startDate,
      deadline
    );

    if (assigneeId && assigneeId !== creatorId) {
      await createNotification(
        assigneeId,
        `Task "${title}" has been assigned to you"`
      );
    }

    res.status(201).json({
      message: "Task created successfully",
      affectedRows: result
    });

  } catch (err) {

    console.error("CREATE TASK ERROR:", err);

    res.status(500).json({
      message: "Create task failed"
    });

  }
};


// ================= GET TASKS =================
export const getTasks = async (req, res) => {
  try {

    const tasks = await getAllTasks();

    res.json(tasks);

  } catch (err) {

    console.error("GET TASKS ERROR:", err);

    res.status(500).json({
      message: "Fetch tasks failed"
    });

  }
};


// ================= UPDATE TASK =================
export const editTask = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      title,
      description,
      assigneeId,
      status,
      startDate,
      deadline
    } = req.body;

    const result = await updateTask(
      id,
      title,
      description,
      assigneeId,
      status,
      startDate,
      deadline
    );

    if (!result || result === 0) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      message: "Task updated successfully"
    });

  } catch (err) {

    console.error("UPDATE TASK ERROR:", err);

    res.status(500).json({
      message: "Update failed"
    });

  }
};


// ================= DELETE TASK =================
export const removeTask = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await deleteTask(id);

    if (!result || result === 0) {

      return res.status(404).json({
        message: "Task not found"
      });

    }

    res.json({
      message: "Task deleted successfully"
    });

  } catch (err) {

    console.error("DELETE TASK ERROR:", err);

    res.status(500).json({
      message: "Delete failed"
    });

  }
};