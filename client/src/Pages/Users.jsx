import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = (id, isConfirmed) => {
    alert("Are you sure you want to delete this user?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3001/deleteUser/${id}`)
        .then((response) => {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const fetcUserData = async () => {
    const allUsersData = await axios.get("http://localhost:3001/getUsers");
    return allUsersData;
  };

  useEffect(() => {
    fetcUserData()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error setting users:", err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to={"/create"} className="btn btn-success">
          Add User
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user, item) => (
              <tr key={item}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-success">
                    <button className="btn btn-success mr-2">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id, true)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
