import React, { useEffect } from "react";
import Post from "./Post";
import usePost from "../hooks/usePost";
import Navbar from "../../navbar/Navbar";

function Allpost() {
  const { feed, handlePost } = usePost();
  useEffect(() => {
    handlePost();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap gap-10 items-center justify-center mt-5">
        {!feed ? (
          <p className="text-center text-gray-500">
            No posts available please login to see posts
          </p>
        ) : (
          feed.map((post) => <Post key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Allpost;
