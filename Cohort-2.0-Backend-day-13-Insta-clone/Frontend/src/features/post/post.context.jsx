import { createContext, useState } from "react";

export const PostContext = createContext();

function PostContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, setLoading, feed, setFeed, post, setPost }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
