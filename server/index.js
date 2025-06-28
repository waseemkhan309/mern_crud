const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
const mongoDbString =
  "mongodb+srv://crudUser:crudUser123@crudcluster.kn6rrbd.mongodb.net/crud";
app.use(cors());
app.use(express.json());
mongoose.connect(mongoDbString);

// APIs
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// get API to get all users Record
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// update userId
app.patch("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  console.log("Req", req.body);
  UserModel.findByIdAndUpdate({ _id: id }, req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

// delte User
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});
app.listen(3001, () => {
  console.log("Server Runing....");
});
