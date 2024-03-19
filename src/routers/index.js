const express = require("express");

const index = express();

index.use("/student",require("./r_student"))
index.use("/subject",require("./r_subject"))
index.use("/exam",require("./r_exam"))
index.use("/result",require("./r_result"))
index.use("/enrolledStudent",require("./r_enrolledStudent"))

module.exports = index;