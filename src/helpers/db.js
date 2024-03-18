const mongoose = require("mongoose");
const config = require("../config/config");
// const dotenv = require("dotenv")
// dotenv.config()
try {
  // "mongodb+srv://yash_dhamal:yash2404@cluster0.i5tpkni.mongodb.net/e-commerce"
  mongoose
    .connect(config.DB_URL)
    .then((res) => {
      // console.log(res);
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
} catch (error) {
  console.log(error);
}
