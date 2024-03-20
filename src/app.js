const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const { default: rateLimit } = require("express-rate-limit");
require("../src/helpers/db");
dotenv.config();

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(express.json());
app.use(cors());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too Many Requests From This IP, Please Try Again Later..!",
});
app.use(limiter);

// app.use("/student",require("./routers/r_student"))
// app.use("/subject",require("./routers/r_subject"))
// app.use("/exam",require("./routers/r_exam"))
// app.use("/result",require("./routers/r_result"))
// app.use("/enrolledStudent",require("./routers/r_enrolledStudent"))
app.use("/studentLogin", require("./routers/r_studentLogin"));

app.use(
  "/",
  require("../src/middlewares/authmiddleware"),
  require("../src/routers/index")
);
module.exports = app;
