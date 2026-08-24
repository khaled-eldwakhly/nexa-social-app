import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getBookmarksAPI() {
  const { data } = await axios.get(`${BASE_URL}/users/bookmarks`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}
