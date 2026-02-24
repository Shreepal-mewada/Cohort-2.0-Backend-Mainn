import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api/post",
  withCredentials: true,
});

export const showAllPosts = async () => {
  try {
    const response = await api.get("/allposts");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
