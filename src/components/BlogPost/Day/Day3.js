import { useState } from "react";
import Swal from "sweetalert2";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dataOfBirth: "",
    gender: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //async is for sweetalert2 and also await swal.fire({content})
  const handleSubmit = async (e) => {
  e.preventDefault();
    // console.log(Boolean (formData.name))
    if(formData.name && formData.email && formData.dataOfBirth && formData.gender && formData.message){
        const isSubmit = await Swal.fire({
        title: "Do you want to submit?",
        text: "The info will be sent in the back door",
        icon: "question",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCloseButton: true,
        showCancelButton: true,
        });
        // console.log(Boolean (formData.name))
        // when we click cancel it will do this condition
        if (!isSubmit.isConfirmed) {
            return;
        }
        Swal.fire({
          title: "Done!",
          text: "Your info has been saved",
          icon: "success",
          confirmButtonText: "Ok",
        });
    }
    else{
        return await Swal.fire({
            title: "Warning",
            text: "Your info is suck",
            icon: "error",
            confirmButtonText: "ok",
            showCloseButton: true,
            });
    }
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      dataOfBirth: "",
      gender: "",
      message: "",
    });
  };
  return (
    <form className="form" onSubmit={handleChange}>
      <h1>Give me your info</h1>
      <input
        value={formData.name}
        onChange={handleChange}
        type="text"
        name="name"
        placeholder="Name"
        required
      ></input>
      <input
        value={formData.email}
        onChange={handleChange}
        type="email"
        name="email"
        placeholder="Email"
        required
      ></input>
      <input
        value={formData.dataOfBirth}
        onChange={handleChange}
        type="date"
        name="dataOfBirth"
        placeholder="mm/dd/yyyy"
        required
      ></input>
      <select
        value={formData.gender}
        onChange={handleChange}
        name="gender"
        required
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <textarea
        value={formData.message}
        name="message"
        onChange={handleChange}
        placeholder="Message"
      ></textarea>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

const Day3 = () => {
  const [submissions, setSubmissions] = useState([]);
  const handleSubmit = (formData) => {
    setSubmissions([...submissions, formData]);
  };
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}></Form>
      <div className="submissions">
        <h3>information's recieve</h3>
        {submissions.map((ss, index) => (
          <div className="submission-item">
            <p>
              <strong>Name: </strong> {ss.name}
            </p>
            <p>
              <strong>Sex: </strong> {ss.gender}
            </p>
            <p>
              <strong>Email: </strong> {ss.email}
            </p>

            <p>
              <strong>Date of Birth: </strong> {ss.dataOfBirth}
            </p>
            {/* <p>
                    <strong>Message: </strong> {ss.message} 
                </p> */}
          </div>
        ))}
      </div>
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
            max-width: 600px;
            text-align: center;
            margin: 0 auto;
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
          .form input,
          .form textarea,
          .form select {
            margin: 10px 0;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 16px;
            .form textarea {
              min-height: 100px;
              resize: vertical;
            }
            .form button {
              margin: 10px 0;
              padding: 10px;
              background-color: #4caf50;
              color: white;
              border: none;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
            }
        `}
      </style>
    </div>
  );
};

export default Day3;
