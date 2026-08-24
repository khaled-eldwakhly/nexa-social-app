import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function likeCommentAPI(postId, commentId) {
  const { data } = await axios.put(
    `${BASE_URL}/posts/${postId}/comments/${commentId}/like`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function createReplyAPI(postId, commentId, contentFormData) {
  const { data } = await axios.post(
    `${BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
    contentFormData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function createCommentAPI(postId, contentFormData) {
  const { data } = await axios.post(
    `${BASE_URL}/posts/${postId}/comments`,
    contentFormData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function getPostCommentsAPI(postId) {
  const { data } = await axios.get(
    `${BASE_URL}/posts/${postId}/comments?page=1&limit=10`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function getCommentRepliesAPI(postId, commentId) {
  const { data } = await axios.get(
    `${BASE_URL}/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function deleteCommentAPI(postId, commentId) {
  const { data } = await axios.delete(
    `${BASE_URL}/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function editCommentAPI(postId, commentId, formData) {
  const { data } = await axios.put(
    `${BASE_URL}/posts/${postId}/comments/${commentId}`,
    formData,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}
