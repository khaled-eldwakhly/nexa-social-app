import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUnreadCountAPI() {
  const { data } = await axios.get(`${BASE_URL}/notifications/unread-count`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function getNotificationsAPI(unread) {
  const { data } = await axios.get(`${BASE_URL}/notifications`, {
    headers: {
      token: localStorage.getItem("token"),
    },
    params: unread !== undefined ? { unread } : {},
  });
  return data;
}

export async function markNotificationAsReadAPI(notificationId) {
  const { data } = await axios.patch(
    `${BASE_URL}/notifications/${notificationId}/read`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function markAllAsReadAPI() {
  const { data } = await axios.patch(
    `${BASE_URL}/notifications/read-all`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}
