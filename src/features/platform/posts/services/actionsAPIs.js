import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function like_Unlike_PostAPI(postId) {
  const { data } = await axios.put(
    `${BASE_URL}/posts/${postId}/like`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );

  return data;
}

export async function bookmark_Unbookmark_PostAPI(postId) {
  const { data } = await axios.put(
    `${BASE_URL}/posts/${postId}/bookmark`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function sharePostAPI(postId) {
  const { data } = await axios.post(
    `${BASE_URL}/posts/${postId}/share`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function getPostLikesAPI(postId) {
  const { data } = await axios.get(
    `${BASE_URL}/posts/${postId}/likes?page=1&limit=20`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}
