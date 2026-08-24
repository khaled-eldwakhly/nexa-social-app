import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getFollowSuggestionsAPI() {
  const { data } = await axios.get(`${BASE_URL}/users/suggestions?limit=15`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}
