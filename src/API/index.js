import Axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Axios instance with default headers
const axiosInstance = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// 📌 Authentication APIs
export const signupAPI = async (userData) =>
  await axiosInstance.post("/auth/signup/", userData);

export const loginAPI = async (credentials) => {
  const response = await axiosInstance.post("/auth/login/", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logoutAPI = async () => {
  await axiosInstance.post("/auth/logout/");
  localStorage.removeItem("token");
};

// 📌 User Profile APIs
export const getUserProfileAPI = async () =>
  await axiosInstance.get("/user_profile/");

export const updateUserProfileAPI = async (profileData) =>
  await axiosInstance.put("/user_profile/update/", profileData);

// 📌 Posts APIs
export const getAllPostsAPI = async () => await axiosInstance.get("/posts/");

export const getPostAPI = async (postId) =>
  await axiosInstance.get(`/posts/${postId}`);

export const createPostAPI = async (content) =>
  await axiosInstance.post("/posts/create/", { content });

export const putLikePostAPI = async (postId) =>
  await axiosInstance.post(`/posts/${postId}/like/`);

export const unlikePostAPI = async (postId) =>
  await axiosInstance.post(`/posts/${postId}/unlike/`);

// 📌 Pitches APIs
export const getAllPitchesAPI = async () => await axiosInstance.get("/pitches/");

export const createPitchAPI = async (title, description) =>
  await axiosInstance.post("/pitches/create/", { title, description });

// 📌 Direct Messages APIs
export const getDirectMessagesAPI = async (page) =>
  await axiosInstance.get(`/direct?_page=${page}&_limit=7`);

export const sendMessageAPI = async (receiverId, text) =>
  await axiosInstance.post("/messages/send/", { receiver: receiverId, text });

// 📌 Users API
export const getUsersAPI = async ({ username }) =>
  await axiosInstance.get(`/users?username=${username}`);

export const saveUserAPI = async ({ user }) =>
  await axiosInstance.post(`/users`, user);

// 📌 Recommendations API
export const getAllRecomendedAPI = async () =>
  await axiosInstance.get("/recomended/");

export const getAllRecomendedProfilesAPI = async () =>
  await axiosInstance.get("/api/suggested-profiles/");

// 📌 Stories API
export const getUsersStoryAPI = async () =>
  await axiosInstance.get("/stories/");

// 📌 Recent Searches API
export const getRecentSearchesAPI = async () =>
  await axiosInstance.get("/recent_searches");

// 📌 Notifications API
export const getNotificationsAPI = async () =>
  await axiosInstance.get("/notifications/");

export const markNotificationReadAPI = async (notifId) =>
  await axiosInstance.post(`/notifications/${notifId}/read/`);

// 📌 Search API
export const searchUsersAPI = async (query) =>
  await axiosInstance.get(`/search/users/?q=${query}`);

export const searchPostsAPI = async (query) =>
  await axiosInstance.get(`/search/posts/?q=${query}`);
