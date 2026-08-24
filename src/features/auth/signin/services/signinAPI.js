import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function signinAPI(userData) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/signin`, userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
