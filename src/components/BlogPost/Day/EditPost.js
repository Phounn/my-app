import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";
function EditPost() {
  const [postDetail, setPostDetail] = useState(null);
  const [editPost, setEditPost] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostDetail(response.data.data.post);
        setEditPost(response.data.data.post.content);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch post", "error");
      }
    };
    fetchPost();
  }, [id]);
  const handleEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `${API_URL}/posts/${id}`,
        { content: editPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", "Post updated successfully", "success");
      navigate("/");
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message ?? "Failed to update post", "error");
    }
  };
  return (
    <div>
      <h2>Edit Post {id}</h2>
      <h2>
        Writer {postDetail?.author?.first_name} {postDetail?.author?.surname}
      </h2>
      <form onSubmit={handleEdit}>
        <textarea
          value={editPost}
          onChange={(e) => setEditPost(e.target.value)}
          placeholder="Edit Post"
          cols={30}
          rows={10}
        ></textarea>
        <button type="submit">Update Post</button>
      </form>
      <button onClick={() => navigate("/") }>Back</button>
    </div>
  );
}

export default EditPost;
