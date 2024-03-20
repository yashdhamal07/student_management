const express = require("express");

const { getStudentLogin } = require("../controller/studentLogin.js");

const studentLogin = express.Router();

studentLogin.get("/", getStudentLogin);

module.exports = studentLogin;
