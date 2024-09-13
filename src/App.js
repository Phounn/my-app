import { useEffect, useState } from "react";
import Day2 from "./components/BlogPost/Day/Day2";
import "./App.css";
import Day3 from "./components/BlogPost/Day/Day3";
import Day4 from "./components/BlogPost/Day/Day4";
import Day5 from "./components/BlogPost/Day/Day5";
import Day6 from "./components/BlogPost/Day/Day6";
import Day7 from "./components/BlogPost/Day/Day7";
import Day8 from "./components/BlogPost/Day/Day8";
import Day9 from "./components/BlogPost/Day/Day9";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


//Main Component
const App = () => {
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [currentDay, setCurrentDay] = useState(9);
  const navigate = useNavigate();
  
  console.log(localStorage.getItem('token'))
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/authentication');
    }
  }, [])

  const handleDayClick = (day) => {
    setCurrentDay(day);
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
  const DayContent = ({ day }) => {
    switch (day) {
      case 2:
        return <Day2></Day2>;

      case 3:
        return <Day3 />;
      case 4:
        return <Day4 />;
      case 5:
        return <Day5 />;
      case 6:
        return <Day6 />;
      case 7:
        return <Day7 />;
      case 8:
        return <Day8 />;
      case 9:
        return <Day9 />;
      default:
        return null;
    }
  };
  return (
    <div className="app">
      {days.map((element, index) => (
        <button
          onClick={() => {
            handleDayClick(element);
          }}
          className={currentDay == element ? "active-btn" : "inactive-btn"}
        >
          The day is {element}
        </button>
      ))}
      <DayContent day={currentDay}></DayContent>
      <button
        onClick={async () => {
          await handleLogout();
        }}
      >
        Log out
      </button>
      <p>{currentDay}</p>
      {/* <Day2 /> */}
      <button onClick={() => {navigate('/profile')}}>profile</button>
    </div>
  );
};

export default App;
