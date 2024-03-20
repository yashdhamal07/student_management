const express = require("express");
const { validationResult, body } = require("express-validator");

const {
  getExams,
  getExam,
  insertExam,
  updateExam,
  deleteExam,
} = require("../controller/exam.js");

const isValidate = [
  body("exam_title").notEmpty().withMessage("Please Enter Exam Title"),
  body("subject_id").notEmpty().withMessage("Please Enter Subject Id"),
  body("exam_date").notEmpty().withMessage("Please Enter Exam Date"),
  body("total_marks").notEmpty().withMessage("Please Enter Total Marks"),
];

const exam = express.Router();

// get methods
exam.get("/", getExams);
exam.get("/:id", getExam);

// post method
exam.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  insertExam(req, res);
});

// put method
exam.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  updateExam(req, res);
});

// delete method
exam.delete("/:id", deleteExam);

module.exports = exam;
