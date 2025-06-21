import React, { useContext, useState } from "react";
import { getDatabase, push, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import lib from "../../lib/lib";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const db = getDatabase();
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return alert("Please fill in all fields.");
    }

    const newPost = {
      PostTitle: title,
      PostContent: content,
      PostUsername: user.fullName || user.email,
      PostUserUid: user.uid,
      PostUserEmail: user.email,
      profile_picture: user.photoURL || "",
      createdAt: Date.now(),
    };

    try {
      await push(ref(db, "posts/"), newPost);
      lib.SuccessToast("Post created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      console.error(err);
      lib.ErrorToast("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 h-40 mb-4 rounded"
        ></textarea>
        <button
          onClick={handlePost}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
