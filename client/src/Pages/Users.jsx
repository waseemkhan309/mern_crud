import React, { useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([
    { Id: 1, Name: "John Doe", Email: "john@gmail.com", Age: 25 },
  ]);

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
            {users?.map((user, item) => (
              <tr key={item}>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Age}</td>
                <td>
                  <Link to={"/update"} className="btn btn-success">
                    <button className="btn btn-success me-2">Edit</button>
                  </Link>
                  <Link to={"/delete"} className="btn btn-danger">
                    <button className="btn btn-danger">Delete</button>
                  </Link>
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
