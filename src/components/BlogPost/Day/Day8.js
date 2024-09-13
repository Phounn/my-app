import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";
const Day8 = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loginData, setLoginData] = useState({
    email: "bsanthasith@gmail.com",
    password: "8899",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    console.log(`Fetch Post!`)
    fetchPosts();
    fetchMyUser();
  }, [])

  const fetchMyUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setUser(response.data.data.data)
    } catch(error) {
      localStorage.removeItem('token')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Welcome Home ${response.data.data.user.first_name}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fail to Login",
        text: "Please check your info. Then try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, signupData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `You registered. Welcome ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPosts([]);
      return;
    }
    setIsPostsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsPostsLoading(false);
    }
  };
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you ok?",
      text: "You want to GO away?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Go",
      cancelButtonText: "Stay",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      await Swal.fire({
        icon: "success",
        title: "Log out completed",
        text: "Thanks for using our service?!?!!?!??!",
      });
      navigate("/authentication");
    }
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "Please login to perform this action!",
      });
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/posts`,
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost("");
      fetchPosts();
      Swal.fire({
        icon: "success",
        title: "Create a new post successfully!",
        text: "You have already posted",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Cannot create a new post!",
        text: "Please try again...",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const formDateTime = (isoString) => {
    // create Data object from ISO String
    const date = new Date(isoString);
    // adapt time UTC
    date.setHours(date.getHours() + 7);
    // function adds 0 number in front
    const padZero = (num) => num.toString().padStart(2, "0");
    // pull time
    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1);
    const year = padZero(date.getUTCFullYear());
    // pull time
    let hours = date.getUTCHours();
    const minutes = padZero(date.getUTCMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    // adapt hour
    hours = hours % 12;
    hours = hours ? hours : 12; //if hour is 0, make it 12
    hours = padZero(hours);
    // create string to result
    return `${day} - ${month} - ${year} - ${hours}:${minutes} ${ampm}`;
  };
  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Please log in to system",
        icon: "warning",
        text: "Please log in to remove post",
      });
      return;
    }
    const result = await Swal.fire({
      title: "Are you ok?",
      text: "You cannot restore this post",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Removed", "Your post has been removed", "success");
        fetchPosts();
      } catch (error) {
        Swal.fire(
          "What's Wrong with you",
          error?.response?.data?.message ?? "Cannot remove, please try again",
          "error"
        );
      }
    }
  };
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Please log in to system",
        icon: "warning",
        text: "Please log in to remove post",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "Liked",
          text: "You liked this post",
          timer: 1500,
          showCancelButton: false,
        });
      }
    } catch (error) {
      Swal.fire(
        "What's wrong with you",
        error?.response?.data?.message ?? "Cannot like",
        "error"
      );
    }
  };
  return (
    <div className="container">
      <h1>Day 8: Login and Post CRUD and Router System</h1>
      {isLoading && <div className="loading">Loading...</div>}
      <div>
        <h2>Hello, {user?.first_name}!!</h2>
        <p>Email: {user?.email}</p>
        <p>Phone Number: {user?.phone_number}</p>
        <p>Accessation: {user?.role}</p>
        <button onClick={handleLogout}>Log out</button>

        <h2>Post</h2>
        <button
          onClick={() => {
            fetchPosts();
          }}
        >
          Refresh Posts
        </button>
        {isPostsLoading ? (
          <div className="loading">Loading</div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <button
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                >
                  Remove
                </button>
                <p>Time: {formDateTime(post.createdAt)}</p>
                <p>Aurthor: {post.author.first_name}</p>
                <p>{post.content}</p>
                <p>Like: {post.likes ? post.likes.length : 0}</p>
                {/* <Link to={`edit`}>hi</Link> */}
                <button
                  onClick={() => {
                    // console.log(handleLike(post._id))
                    handleLike(post._id);
                  }}
                >
                  Like
                </button>
                <Link to={`/edit/${post._id}`}>Edit</Link>
                <hr />
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Create post"
          ></textarea>
          <button type="submit" disabled={isLoading}>
            Create Post
          </button>
        </form>
      </div>
      <style jsx>
        {`
                    .container{
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .tabs{
                        display: flex;
                        margin-bottom; 20px;
                    }
                    .tabs button{
                        flex: 1;
                        padding: 10px;
                        border:none;
                        background-color: #f1f1f1;
                        cursor: pointer;
                    
                    }
                    .tabs button.active{
                        background-color: #4CAF50;
                        color: white; 
                    }
                    form{
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 20px
                    }
                    input, textarea {
                        margin-bottom: 10px;
                        padding: 5px;                    

                    }
                    button{
                        padding: 10px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        cursor: pointer;
                    }
                    button:disabled{
                        background-color: #cccccc;
                        cursor: not-allowed;
                    }
                    ul{
                        list-style-type: none;
                        padding: 0;
                    }
                    li{
                        background-color: #f1f1f1;
                        margin-bottom: 10px;
                        padding: 10px;
                        border-radius: 5px; 
                    }
                    .loading{
                        text-align: center;
                        padding: 20px;
                        font-style: italic;
                        color: #666;
                    }
                
                `}
      </style>
    </div>
  );
};

export default Day8;
