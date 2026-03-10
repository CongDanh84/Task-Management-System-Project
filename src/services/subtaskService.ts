const API_URL = import.meta.env.VITE_API_URL + "/subtasks";

// ================= GET =================
export const getSubtasks = async (taskId: string) => {
  const response = await fetch(`${API_URL}/${taskId}`);

  if (!response.ok) throw new Error("Failed to fetch subtasks");

  return response.json();
};

// ================= CREATE =================
export const createSubtask = async (subtask: {
  taskId: string;
  title: string;
  status?: string;
}) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subtask),
  });

  if (!response.ok) throw new Error("Failed to create subtask");

  return response.json();
};

// ================= UPDATE STATUS =================
export const updateSubtaskStatus = async (
  id: string,
  status: string
) => {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Failed to update subtask");

  return response.json();
};

// ================= DELETE =================
export const deleteSubtask = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete subtask");

  return response.json();
};