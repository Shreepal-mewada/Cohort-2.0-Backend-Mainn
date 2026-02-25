import React, { useState } from "react";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const { loading, handleCreatePost } = usePost();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePost(image, caption);
    navigate("/");

    if (!caption || !image) {
      alert("Please fill all fields");
      return;
    }

    // For now just logging
    console.log("Caption:", caption);
    console.log("Image:", image);

    // Reset
    setCaption("");
    setImage(null);
    setPreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption Input */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div>
              <img
                src={preview}
                alt="preview"
                className="w-full rounded-lg object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
