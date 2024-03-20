const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getSubjects,
  getSubject,
  insertSubject,
  updateSubject,
  deleteSubject,
} = require("../controller/subject.js");

const isValidate = [
  body("subject_name").notEmpty().withMessage("Please Enter Subject Name"),
];

const subject = express.Router();

// get methods
subject.get("/", getSubjects);
subject.get("/:id", getSubject);

// post method
subject.post("/", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  insertSubject(req, res);
});

// put method
subject.put("/:id", isValidate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res?.status(400).json({ errors: errors.array() });
  }
  updateSubject(req, res);
});

// delete method
subject.delete("/:id", deleteSubject);

module.exports = subject;
