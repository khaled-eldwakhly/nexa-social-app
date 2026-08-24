import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function signupAPI(userData) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/signup`, userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
