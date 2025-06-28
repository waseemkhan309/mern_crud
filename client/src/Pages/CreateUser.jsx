import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const postUserAPIURL = "http://localhost:3001/createUser";
const CreateUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age } = userData;
    if (!name || !email || !age) {
      alert("Please fill all fields");
      return;
    }

    // console.log("User Data Submitted:", userData);
    await axios
      .post(postUserAPIURL, userData)
      .then((res) => {
        console.log(res);
        navigate("/");
        toast.success("User Created Successfully");
      })
      .catch((err) => {
        console.error("Error creating user:", err);
        toast.error(err.message || "Failed to create user");
      });
  };

  const handleFieldsData = (e) => {
    const { name, value } = e.target;
    // console.log("Field Changed:", name, value);
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              //   value={userData.name}
              onChange={handleFieldsData}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              //   value={userData.email}
              onChange={handleFieldsData}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Age</label>
            <input
              type="text"
              name="age"
              className="form-control"
              placeholder="Enter Age"
              //   value={userData.age}
              onChange={handleFieldsData}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to={"/"}>
              <button className="btn btn-danger ms-2">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
