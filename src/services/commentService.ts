import axios from "axios";

const API_URL = "https://task-management-system-project-d71z.onrender.com/api/comments";

export const commentService = {

  getCommentsByTask: async (taskId: string) => {
    const res = await axios.get(`${API_URL}/${taskId}`);
    return res.data;
  },

  createComment: async (data: any) => {
    const res = await axios.post(API_URL, data);
    return res.data;
  }

};