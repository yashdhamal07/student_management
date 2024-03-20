const express = require("express");
const { validationResult, body } = require("express-validator");

const {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controller/student.js");

const isValidate = [
  body("student_name").notEmpty().withMessage("Please Enter Student Name"),
  body("roll_no").notEmpty().withMessage("Please Enter Roll No"),
  body("email_id").notEmpty().withMessage("Please Enter Email Id"),
];

const student = express.Router();

// Get methods
student.get("/", getStudents);
student.get("/:id", getStudent);

// put methods
student.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  updateStudent(req, res);
});

// delete method
student.delete("/:id", deleteStudent);

module.exports = student;
