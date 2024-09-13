import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";


const Profile = () => {
  const [opt, setOpt] = useState(false)
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchMyuser();
  }, []);
  const fetchMyuser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data.data);
    } catch (error) {
      localStorage.removeItem("token");
    }
  };
  const handleOpt = () => {
    setOpt(!opt)
  } 
  return (
    <div className="profile-container">
      <nav>
        <div>
          <h2>
            {user?.first_name} {user?.surname}
          </h2>
        </div>
        <div>
          <button className="bar-opt" onClick={handleOpt}>
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>

      <div className={opt ? "show-bar" : "hidden-bar"}>
        <ul className="ul">
          <li ><a href="#home">HOME</a></li>
          <li><a href="#about">ABOUT ME</a></li>
          <li><a href="#resume">EDUCATION</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
      </div>
      <main>
        <section className="main-container" id="home">
          <div id="home-container">
            <div id="intro-text">
              <h1 id="intro-text">Introduce</h1>
            </div>
            <div id="home-content">
              <div>
                <h3>Welcome to Bill Design</h3>
              </div>
              <div>
                <h1>
                  <strong>
                    Hi, My name is{" "}
                    <span>
                      {user?.first_name} {user?.surname}
                    </span>
                  </strong>
                </h1>
                <h1>
                  I STUDY REACT IN THIS <span>TRAINING</span>
                </h1>
              </div>
              <div>Let me show you----------</div>
            </div>
            <div className="imgp">
              <img src="./img-profile.jpg" alt="" />
            </div>
          </div>
        </section>
        <section className="main-container" id="about">
          <div id="container-about">
            <div>
              <h4>About me</h4>
              <h1>
                MY MISSION IS <span>DEVELOPING</span> WITH <span>MY BEST</span>{" "}
                REACT WEBSITE AROUND
              </h1>
              <p>
                I love everything that has to do with Web development, and I
                feel TRUE devotion for typography. I don't have experience as a
                worker. However, I'm a practicer and a learner, so I do have a
                lot of PROJECTS and CERTIFICATES.
              </p>
            </div>
            <div className="div-pic">
              <img src="./picture.jpg" alt="" />
              <img src="./picture2.jpg" alt="" />
            </div>
          </div>
        </section>
        <section className="main-container" id="resume">
          <div className="resume-container">
            <div className="edu-container">
              <div className="edu-nav">
                <h1>Education</h1>
              </div>
              <div className="edu">
                <h5>School and Institue</h5>
                <p>Graduated from Neerada School.</p>
                <p>Stuying at Soutsaka Institute of Technology</p>
                <h5>Certificate</h5>
                <p>Embeded C Programming 11th. Augest, 2023</p>
                <p>JAVA Programming. 25th August, 2023</p>
                <p>IT Entrepreneurship Course 16th August, 2024</p>
              </div>
            </div>

  
          </div>
        </section>
        <section className="main-container" id="contact">
          <div className="contact-container">
            <h1 className="contact-text">Contact</h1>
            <ul>
              <li>
                <i class="fa-brands fa-whatsapp fa-10x"></i>
                <h1>{user?.phone_number}</h1>
              </li>
              <li>
                <i class="fa-regular fa-envelope fa-10x"></i> 
                <h1>{user?.email}</h1>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <footer>
        <h4>{user?.first_name} 2024</h4>
      </footer>

      <script
        src="https://kit.fontawesome.com/5693cd65ea.js"
        crossorigin="anonymous"
      ></script>
    </div>
  );
};

export default Profile;
