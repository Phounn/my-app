import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Authentication = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
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
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Welcome Home ${response.data.data.user.first_name}`,
          timer: 1500
        });
        navigate('/')
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
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `You registered. Welcome ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
          timer: 1500
        });
        navigate('/')
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container">
      <img src="https://imgs.search.brave.com/GkXmz4PCw94AlQzEzydjB31sh9eZVyn2DG8-5gADHZ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzk2LzE5LzQ4/LzM2MF9GXzE5NjE5/NDgwMV9WZnk1V0k4/ZElUNTY5MGZrUU95/ZVBMdUJIVUpoM1J6/UC5qcGc"></img>
      <div className="tabs">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "signup" ? "active" : ""}
          onClick={() => setActiveTab("signup")}
        >
          Register
        </button>
      </div>
      {activeTab === "login" && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          ></input>
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          ></input>
          <button type="submit" disabled={isLoading}>
            Login
          </button>
        </form>
      )}
      {activeTab === "signup" && (
        <div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Firstname"
              value={signupData.first_name}
              onChange={(e) =>
                setSignupData({ ...signupData, first_name: e.target.value })
              }
            ></input>
            <input
              type="text"
              placeholder="Surname"
              value={signupData.surname}
              onChange={(e) =>
                setSignupData({ ...signupData, surname: e.target.value })
              }
            ></input>
            <input
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            ></input>
            <input
              type="tel"
              placeholder="Phone Number"
              value={signupData.phone_number}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  phone_number: e.target.value,
                })
              }
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            ></input>
            <button type="submit" disabled={isLoading}>
              Register
            </button>
          </form>
        </div>
      )}
      <style jsx>
        {`
                    .container{
                    display: flex;
                    align-items: center;
                        max-width: 500px;
                        margin: 150px auto;
                        padding: 20px;
                        background-color: gray;
                    }
                        .container img{
                          max-width: 200px;
                          border-radius: 50%; 
                        }
                    .tabs{
                        display: flex;
                        margin-bottom; 20px;
                        min-width: 250px;
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

export default Authentication;
