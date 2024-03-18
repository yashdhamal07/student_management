const express = require("express");

const {
    getSubjects,
    getSubject,
    insertSubject,
    updateSubject,
    deleteSubject
   
   } = require("../contoller/subject.js")
   
   const subject = express.Router()
   
   subject.get("/",getSubjects)
   subject.get("/:id",getSubject)
   subject.post("/",insertSubject)
   subject.put("/:id",updateSubject)
   subject.delete("/:id",deleteSubject);
   
   module.exports = subject;