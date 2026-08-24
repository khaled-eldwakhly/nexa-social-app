import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getMyProfileAPI() {
  const { data } = await axios.get(`${BASE_URL}/users/profile-data`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function changePasswordAPI(passwordObj) {
  const { data } = await axios.patch(
    `${BASE_URL}/users/change-password`,
    passwordObj,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}

export async function changePhotoAPI(formData) {
  const { data } = await axios.put(`${BASE_URL}/users/upload-photo`, formData, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function getUserProfileAPI(userId) {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}/profile`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return data;
}

export async function follow_unfollow_API(userId) {
  const { data } = await axios.put(
    `${BASE_URL}/users/${userId}/follow`,
    {},
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    },
  );
  return data;
}
