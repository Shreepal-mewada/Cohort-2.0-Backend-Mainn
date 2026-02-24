import React from "react";
import { useContext } from "react";
import { PostContext } from "../post.context";
import { showAllPosts } from "../services/post.api";

function usePost() {
  const data = useContext(PostContext);
  const { loading, setLoading, feed, setFeed, post, setPost } =
    data
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
  return {
    loading,
    feed,
    handlePost,
  };
}

export default usePost;
