const express = require("express")

const {
    getExams,
    getExam,
    insertExam,
    updateExam,
    deleteExam
   
   } = require("../contoller/exam.js")
   
   const exam = express.Router()
   
   exam.get("/",getExams)
   exam.get("/:id",getExam)
   exam.post("/",insertExam)
   exam.put("/:id",updateExam)
   exam.delete("/:id",deleteExam);
   
   module.exports = exam;