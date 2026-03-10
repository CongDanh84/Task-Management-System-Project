import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/notifications";

export const fetchNotifications = async (userId: string) => {
  const res = await axios.get(`${API}/${userId}`);
  console.log("NOTIFICATION API:", res.data);
  return res.data;
};

export const markNotificationRead = async (id: string) => {
  await axios.put(`${API}/${id}/read`);
};

export const markAllNotificationsRead = async (userId: string) => {
  await axios.put(`${API}/read-all/${userId}`);
};