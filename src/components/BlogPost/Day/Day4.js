import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.username === "admin" && formData.password == "123") {
      onSubmit(formData);
      setError("");
    } else {
      setError("Username or Password is invalid");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h2>Entrance Form</h2>
      <form className="form">
        {profileImage && (
          <img src={profileImage} className="profile-image" alt="profile"></img>
        )}
        <div className="input-group">
          <label>Profile Picture</label>
          <input
            onChange={handleImageUpload}
            type="file"
            id="profile-image"
            accept="image/*"
          ></input>
        </div>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          ></input>
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

const SignUpForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <h2>Register Form</h2>
      <form className="form">
        {profileImage && (
          <img src={profileImage} className="profile-image" alt="profile"></img>
        )}
        <div className="input-group">
          <label>Profile Picture</label>
          <input
            onChange={handleImageUpload}
            type="file"
            id="profile-image"
            accept="image/*"
          ></input>
        </div>
        <div className="input-group">
          <label>Username</label>
          <input type="text" id="username" name="username"></input>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" id="username" name="username"></input>
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" id="password" name="password"></input>
        </div>
        <button>Register</button>
      </form>
    </div>
  );
};

const Day4 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleLogin = (data) => {
    setIsloggedIn(true);
    setUserData(data);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const toggleLoginMode = () => {
    setIsLoginForm(!isLoginForm);
  };
  const loginMode = () => {
    setIsLoginForm(true);
  };
  const regMode = () => {
    setIsLoginForm(false);
  };
  return (
    <div className={`container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="auth-tabs">
        <button
          type="button"
          onClick={loginMode}
          className={isLoginForm ? "active" : ""}
        >
          Login
        </button>
        <button
          type="button"
          onClick={regMode}
          className={isLoginForm ? "" : "active"}
        >
          Register
        </button>
      </div>
      <button onClick={toggleDarkMode} className="toggle-button">
        {isDarkMode ? "Normal Mode" : "Dark Mode"}
      </button>
      {isLoggedIn ? (
        <h2>Hello, {userData.username}</h2>
      ) : isLoginForm ? (
        <LoginForm onSubmit={handleLogin} />
      ) : (
        <SignUpForm />
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
            max-width: 600px;
            text-align: center;
            margin: 0 auto;
          }
          .dark-mode {
            background-color: #333;
            color: white;
          }
          .dark-mode .form {
            background-color: #444;
            color: white;
          }
          .dark-mode .form input {
            background-color: #555;
            color: white;
            border-color: #666;
          }
          .form {
            display: flex;
            flex-direction: column;
            width: 300px;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          .form input {
            margin: 10px 0;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid $ddd;
            font-size: 16px;
          }
          .form button,
          .logged-in button,
          .toggle-button,
          .auth-tabs button {
            margin: 10px 0c;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          .input-group {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          }
          .profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
          }
          .auth-tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .auth-tabs button {
            background-color: #ddd;
            color: black;
            border: none;
            padding: 10px 20px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 4px;
          }
          .auth-tabs .active {
            background-color: #4caf50;
            color: white;
          }
          .error {
            color: red;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};
export default Day4;
