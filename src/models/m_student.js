const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
});

const student = new mongoose.model("student", studentSchema);

module.exports = student;
