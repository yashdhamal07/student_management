const express = require("express");

const {
    getResults,
    getResult,
    insertResult,
    updateResult,
    deleteResult
} = require("../contoller/result.js")

const result = express.Router();

result.get("/",getResults);
result.get("/:id",getResult);
result.post("/",insertResult);
result.put("/:id",updateResult);
result.delete("/:id",deleteResult);

module.exports = result