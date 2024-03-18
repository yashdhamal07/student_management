const express = require("express")

const {
 getStudents,
 getStudent,
 insertStudent,
 updateStudent,
 deleteStudent

} = require("../contoller/student.js")

const student = express.Router()

student.get("/",getStudents)
student.get("/:id",getStudent)
student.post("/",insertStudent)
student.put("/:id",updateStudent)
student.delete("/:id",deleteStudent);

module.exports = student;