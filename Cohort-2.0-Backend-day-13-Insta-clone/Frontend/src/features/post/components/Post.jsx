import "remixicon/fonts/remixicon.css";
// import { useAuth } from "../../auth/hooks/auth.hook";

const Post = ({ post }) => {
  const { caption, image } = post;
  const { username, profilePic } = post.userId;
  const { isliked } = post;
  // const { user } = useAuth();
  console.log(isliked);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
      {/* User Section */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={profilePic}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h4 className="font-semibold text-gray-800">{username}</h4>
      </div>

      {/* Post Image */}
      <img src={image} alt="post" className="w-full h-auto object-cover" />

      {/* Action Icons */}
      <div className="flex items-center gap-6 px-4 py-3 text-xl">
        <i
          className={`ri-heart-line cursor-pointer hover:text-red-500 transition ${isliked ? "text-red-500" : ""}`}
        ></i>
        <i className="ri-chat-3-line cursor-pointer hover:text-blue-500 transition"></i>
        <i className="ri-share-forward-line cursor-pointer hover:text-green-500 transition"></i>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{username}</span> {caption}
        </p>
      </div>
    </div>
  );
};

export default Post;
