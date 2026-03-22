import {
  createSubtask,
  getSubtasksByTask,
  updateSubtaskStatus,
  deleteSubtask
} from "../models/subtask.model.js";

// GET SUBTASKS BY TASK
export const getSubtasks = async (req, res) => {
  try {
    const { taskId } = req.params;

    const subtasks = await getSubtasksByTask(taskId);

    res.json(subtasks);

  } catch (err) {
    console.error("GET SUBTASKS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch subtasks" });
  }
};

// CREATE SUBTASK
export const createSubtaskController = async (req, res) => {
  try {

    await createSubtask(req.body);

    res.json({ message: "Subtask created" });

  } catch (err) {
    console.error("CREATE SUBTASK ERROR:", err);
    res.status(500).json({ error: "Create subtask failed" });
  }
};

// UPDATE SUBTASK STATUS
export const updateSubtask = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    await updateSubtaskStatus(id, status);

    res.json({ message: "Subtask updated" });

  } catch (err) {
    console.error("UPDATE SUBTASK ERROR:", err);
    res.status(500).json({ error: "Update failed" });
  }
};

// DELETE SUBTASK
export const deleteSubtaskController = async (req, res) => {
  try {

    const { id } = req.params;

    await deleteSubtask(id);

    res.json({ message: "Subtask deleted" });

  } catch (err) {
    console.error("DELETE SUBTASK ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};