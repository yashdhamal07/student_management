const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const helmet = require("helmet")
const path = require("path")
require("../src/helpers/db")
dotenv.config();

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
app.use(express.json()); 
app.use(cors());

app.get("/",async (req,res)=>{
    try {
        return res?.status(200).json({message : "Server Is Running.."})
    } catch (err) {
        return res?.status(500).json({errorMessage : "Server Is Crashed"})
    }
})

app.use("/student",require("./routers/r_student"))
app.use("/subject",require("./routers/r_subject"))
app.use("/exam",require("./routers/r_exam"))

app.use("/",
    require("../src/routers/index")
)

module.exports = app;