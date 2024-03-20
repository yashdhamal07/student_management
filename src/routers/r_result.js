const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getResults,
  getResult,
  insertResult,
  updateResult,
  deleteResult,
} = require("../contoller/result.js");

const result = express.Router();

const isValidate = [
  body("exam_id").notEmpty().withMessage("Please Enter Exam Id"),
  body("student_id").notEmpty().withMessage("Please Enter Student Id"),
  body("obtained_marks").notEmpty().withMessage("Please Enter obtained marks"),
];

// get methods
result.get("/", getResults);
result.get("/:id", getResult);

// post method
result.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  insertResult(req, res);
});

// put method
result.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  updateResult(req,res)
});

// delete method
result.delete("/:id", deleteResult);

module.exports = result;
