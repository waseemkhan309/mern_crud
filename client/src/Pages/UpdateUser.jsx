import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/updateUser/${param.id}`, userData)
      .then((res) => {
        console.log(res);
        toast.success("User Updated Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        toast.error(err || "Failed to update user");
      });
  };

  const fetcUserData = async () => {
    const allUsersData = await axios.get("http://localhost:3001/getUsers");
    return allUsersData;
  };

  useEffect(() => {
    fetcUserData()
      .then((data) => {
        const userRecord = data.data.filter((user) => user._id === param.id);
        if (userRecord.length > 0) {
          setUserData({
            name: userRecord[0].name,
            email: userRecord[0].email,
            age: userRecord[0].age,
          });
        }
      })
      .catch((err) => console.error("Error setting users:", err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={userData.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={userData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              name="age"
              value={userData.age || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn btn-success">Update</button>
            <button className="btn btn-danger ms-2">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
