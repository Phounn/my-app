import { useState } from "react";

const SampleList = () => {
  const fruits = ["coconut", "apple", "banana", "durian"];
  return (
    <div className="div">
      <h2>Fruits' List</h2>
      <ul>
        {fruits.map((e, index) => (
          <li key={index}>
            {index + 1}. {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ASEANCountries = () => {
  const countires = [
    "Laos",
    "Vietnam",
    "Thailand",
    "Cambodia",
    "Mynmar",
    "Singapore",
    "Malaysia",
    "Indonasia",
    "Brunai",
  ];
  return (
    <div className="div">
      <h2>Asean Countries</h2>
      {countires.map((e, index) => (
        <ul>
          <li key={index}>
            {index + 1}. {e}
          </li>
        </ul>
      ))}
    </div>
  );
};
const StudentList = () => {
  const students = [
    {
      name: "Yok",
      class: "7C",
      gender: "Female",
    },
    {
      name: "Cocoon",
      class: "7C",
      gender: "Male",
    },
    {
      name: "Sumo",
      class: "7A",
      gender: "Male",
    },
  ];
  return (
    <div>
      <h2>Student's List</h2>
      <ul>
        {/* 1 way this filter function is filter the condition when it does its work it will be map*/}
        {students
          .filter((e) => e.class === "7C" && e.gender === "Female")
          .map((e, index) => (
            <li key={index}>
              {index}. {e.name}, {e.class} {e.gender}
            </li>
          ))}
        {/* 2 way we write the fucntion ifelse inline, we don't need to write {} and return it*/}
        {students.map((e, index) =>
          e.class === "7C" && e.gender === "Female" ? (
            <li key={index}>
              {e.name}, {e.class} {e.gender}
            </li>
          ) : (
            <div></div>
          )
        )}
        {/* 3 way if we write the function in the multiple line, we need to write {} and then return it*/}
        {students.map((e, index) => {
          if (e.gender === "Male") {
            return <li>{e.gender}</li>;
          }
        })}
      </ul>
    </div>
  );
};

const ToDoList = () => {
  const [toDo, setToDo] = useState([
    {
      text: "study react",
      completed: false,
    },
    {
      text: "create To-do app",
      completed: false,
    },
    {
      text: "Practice List & keys",
      completed: false,
    },
  ]);
  const [formData, setFormData] = useState({
    add: "",
  });
  const onToggleToDo = (index) => {
    const newTodos = [...toDo];
    newTodos[index].completed = !newTodos[index].completed;
    setToDo(newTodos);
  };

  const [newToDo, setNewTodo] = useState("");
  const addTodo = (e) => {
    // const newTodos = [...toDo]
    e.preventDefault();
    setToDo([...toDo, { text: formData.add, completed: false }]);
    setNewTodo("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name + value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>To-do List</h2>
      <form>
        <input
          value={formData.add}
          name="add"
          id="add"
          type="text"
          placeholder="add"
          onChange={handleChange}
        ></input>
        <button type="submit" onClick={addTodo}>
          add
        </button>
      </form>
      <ul>
        {toDo.map((e, index) => (
          <li
            key={index}
            style={{ textDecoration: e.completed ? "line-through" : "none" }}
            onClick={() => onToggleToDo(index)}
          >
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentDay] = useState(0);
  const nextSlide = () => {
    setCurrentDay((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentDay(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  return (
    <div className="carousel">
      <h2>Image caroulsel</h2>
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          alt={`Slide ${index + 1}`}
          className={`carousel-image ${index == currentIndex ? "active" : ""}`}
        ></img>
      ))}
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};
const Day5 = () => {
  const carouselImage = [
    "https://i.redd.it/x63sbkebj4nd1.jpeg",
    "https://i.redd.it/4euv5bawi3nd1.jpeg",
  ];
  return (
    <div className="container">
      <h1>Teaching of list and keys in React</h1>
      <SampleList />
      <hr></hr>
      <ASEANCountries />
      <hr></hr>
      <StudentList />
      <hr></hr>
      <ToDoList />
      <hr></hr>
      <ImageCarousel images={carouselImage} />
      <style jsx>
        {`
          button {
            margin-left: 10px;
            cursor: pointer;
            padding: 5px 10px;
            background-color: #ff4444;
            color: white;
            border: none;
            border-radius: 3px;
          }
          .container {
            // display: flex;
            // flex-direction: column;
            align-items: center;
            min-height: 100vh;
            background-color: white;
            padding: 20px;
            max-width: 600px;
            text-align: center;
            margin: 0 auto;
          }
          .div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .app {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          li {
            //   width: 200px;
            margin-bottom: 10px;
            padding: 10px;
            background-color: #f0f0f0;
            border-radius: 5px;
          }
          hr {
            color: black;
            width: 100%;
          }
          .carousel {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }
          .carousel-image {
            width: 100%;
            height: auto;
            display: none;
          }
          .carousel-image.active {
            display: block;
          }
          .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 18px;
          }
          .prev {
            left: 10px;
          }
          .next {
            right: 100px;
          }
        `}
      </style>
    </div>
  );
};

export default Day5;
