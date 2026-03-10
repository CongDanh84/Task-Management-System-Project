import {
  createNotification,
  getNotificationsByUser,
  markNotificationRead,
  markAllNotificationsRead
} from "../models/notification.model.js";


// GET notifications by user
export const getNotifications = async (req, res) => {
  try {

    const { userId } = req.params;

    const data = await getNotificationsByUser(userId);

    res.json(data);

  } catch (err) {
    console.error("GET NOTIFICATIONS ERROR:", err);
    res.status(500).json({ message: "Fetch notifications failed" });
  }
};


// CREATE notification
export const createNotificationController = async (req, res) => {
  try {

    const { userId, message } = req.body;

    await createNotification(userId, message);

    res.json({
      message: "Notification created"
    });

  } catch (err) {
    console.error("CREATE NOTIFICATION ERROR:", err);
    res.status(500).json({ message: "Create notification failed" });
  }
};


// MARK ONE AS READ
export const markAsRead = async (req, res) => {
  try {

    const { id } = req.params;

    await markNotificationRead(id);

    res.json({
      message: "Notification marked as read"
    });

  } catch (err) {
    console.error("MARK READ ERROR:", err);
    res.status(500).json({ message: "Update notification failed" });
  }
};


// MARK ALL AS READ
export const markAllAsRead = async (req, res) => {
  try {

    const { userId } = req.params;

    await markAllNotificationsRead(userId);

    res.json({
      message: "All notifications marked as read"
    });

  } catch (err) {
    console.error("MARK ALL READ ERROR:", err);
    res.status(500).json({ message: "Update notifications failed" });
  }
};