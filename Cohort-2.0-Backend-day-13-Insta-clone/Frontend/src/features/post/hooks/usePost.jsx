import React, { use } from "react";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { showAllPosts,createPost } from "../services/post.api";
import { useEffect } from "react";

function usePost() {
  const data = useContext(PostContext);
  const { loading, setLoading, feed, setFeed, post, setPost } = data;
  const handlePost = async () => {
    try {
      setLoading(true);
      const data = await showAllPosts();
      setFeed(data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePost();
  }, []);

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imageFile, caption);
      setFeed([data.post, ...feed]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    loading,
    feed,
    handlePost,
    handleCreatePost,
  };
}

export default usePost;
