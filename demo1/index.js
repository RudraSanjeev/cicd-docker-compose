const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./model/employee.model");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
console.log(port);
console.log(process.env.MONGO_URI + process.env.DB_NAME);
mongoose
  .connect(process.env.MONGO_URI + process.env.DB_NAME)
  .then(() => {
    console.log("connection successfull !");
  })
  .catch((err) => console.log(err));

app.use(express.json());

// create
app.post("/api/", async (req, res) => {
  try {
    const { id, name, role } = req.body;
    const newEmployee = new Employee({ id, name, role });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
app.get("/api/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
app.delete("/api/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findOne({ id: employeeId });
    if (!employee) {
      return res.status(400).json("no employee found !");
    }

    res.status(200).json("employee has been deleted !");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Backend is runing at port ${port}`);
});
