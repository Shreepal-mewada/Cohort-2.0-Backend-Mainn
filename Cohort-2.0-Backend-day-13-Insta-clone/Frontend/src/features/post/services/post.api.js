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

export const createPost = async (imageFile, caption) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  try {
    const response = await api.post("/", formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
