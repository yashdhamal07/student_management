const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { default: rateLimit } = require("express-rate-limit");
require("../src/helpers/db");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rate limiting function and use for stop hacking with help of some fix time calls API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 10 requests per windowMs
  message: "Too Many Requests From This IP, Please Try Again Later..!",
});
app.use(limiter);

app.use("/studentLogin", require("./routers/r_studentLogin"));
app.use("/studentRegister",require("./routers/r_studentRegister"))

app.use(
  "/",
  require("../src/middlewares/authmiddleware"),
  require("../src/routers/index")
);
module.exports = app;
