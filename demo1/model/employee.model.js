const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  id: Number,
});

module.exports = mongoose.model("Employee", employeeSchema);
