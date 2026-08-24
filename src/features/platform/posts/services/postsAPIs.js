import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function getAllPostsAPI() {
  return axios.get(`${BASE_URL}/posts`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export async function createPostAPI(postFormData) {
  const { data } = await axios.post(`${BASE_URL}/posts`, postFormData, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function editPostAPI(postFormData, postId) {
  const { data } = await axios.put(
    `${BASE_URL}/posts/${postId}`,
    postFormData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function deletePostAPI(postId) {
  const { data } = await axios.delete(`${BASE_URL}/posts/${postId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function getUserPostsAPI(userId) {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}
