const express = require("express");
const { validationResult, body } = require("express-validator");

const { insertStudentRegister } = require("../controller/studentRegister.js");

const studentRegister = express.Router()

const isValidate = [
    body("student_name").notEmpty().withMessage("Please Enter Student Name"),
    body("roll_no").notEmpty().withMessage("Please Enter Roll No"),
    body("email_id").notEmpty().withMessage("Please Enter Email Id"),
  ];

// post method
studentRegister.post("/", isValidate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res?.status(400).json({ errors: errors.array() });
    }
    insertStudentRegister(req, res);
  });

module.exports = studentRegister;