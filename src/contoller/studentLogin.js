const Jwt = require("jsonwebtoken");
const student = require("../models/m_student");

// Student LogIn Function with JWT Token...!
const getStudentLogin = async (req, res) => {
  try {
    const { email_id } = req.query;

    if (!email_id) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const user = await student.findOne({ email_id }).exec();

    if (!user) {
      return res.status(404).json({ msg: "Invalid Email ID" });
    }

    const user_response = {
      user_id: user._id
    };

    const token = Jwt.sign(user_response, process.env.SECRETE);

    return res.json({ user: user_response, token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getStudentLogin };


// const jwt = require("jsonwebtoken");
// const student = require("../models/m_student");

// const generateAccessToken = (userId) => {
//   return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Access token expires in 15 minutes
// };

// const generateRefreshToken = (userId) => {
//   return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Refresh token expires in 7 days
// };

// // Student LogIn Function with JWT Token...!
// const getStudentLogin = async (req, res) => {
//   try {
//     const { email_id } = req.query;

//     if (!email_id) {
//       return res.status(400).json({ msg: "Email is required" });
//     }

//     const user = await student.findOne({ email_id }).exec();

//     if (!user) {
//       return res.status(404).json({ msg: "Invalid Email ID" });
//     }

//     const user_response = {
//       user_id: user._id
//     };

//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     // Set tokens as response headers
//     res.set("accessToken", accessToken);
//     res.set("refreshToken", refreshToken);

//     // Send user information in response body
//     return res.json({ user: user_response });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Middleware to verify access token
// const jwt = require("jsonwebtoken");

// const verifyAccessToken = (req, res, next) => {
//   try {
//     const accessToken = req.headers["authorization"];

//     if (!accessToken) {
//       return res.status(401).json({ msg: "Access token missing" });
//     }

//     const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

//     // Check if token expiration time is past the current time
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (decoded.exp <= currentTime) {
//       return res.status(401).json({ msg: "Access token expired" });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ msg: "Invalid access token" });
//   }
// };

// module.exports = verifyAccessToken;
// module.exports = { getStudentLogin, verifyAccessToken };
