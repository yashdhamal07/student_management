const express = require("express");
const { validationResult, body } = require("express-validator");

const {
  getEnrolledStudents,
  getEnrolledStudent,
  insertEnrolledStudent,
  updateEnrolledStudent,
  deleteEnrolledStudent,
} = require("../contoller/enrolledStudent.js");

const isValidate = [
  body("student_id").notEmpty().withMessage("Please Enter Student Id"),
  body("subject_id").notEmpty().withMessage("Please Subject Id"),
];

const enrolledStudents = express.Router();

// get methods
enrolledStudents.get("/", getEnrolledStudents);
enrolledStudents.get("/:id", getEnrolledStudent);

// post method
enrolledStudents.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  insertEnrolledStudent(req, res);
});

// put method
enrolledStudents.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  updateEnrolledStudent(req, res);
});

// delete method
enrolledStudents.delete("/:id", deleteEnrolledStudent);

module.exports = enrolledStudents;
