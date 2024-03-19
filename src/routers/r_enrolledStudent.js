const express = require("express");

const {
    getEnrolledStudents,
    getEnrolledStudent,
    insertEnrolledStudent,
    updateEnrolledStudent,
    deleteEnrolledStudent
} = require("../contoller/enrolledStudent.js")

const enrolledStudents = express.Router();

enrolledStudents.get("/",getEnrolledStudents);
enrolledStudents.get("/:id",getEnrolledStudent);
enrolledStudents.post("/",insertEnrolledStudent);
enrolledStudents.put("/:id",updateEnrolledStudent);
enrolledStudents.delete("/:id",deleteEnrolledStudent);

module.exports = enrolledStudents;