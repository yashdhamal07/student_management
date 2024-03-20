const Jwt = require("jsonwebtoken");
const student = require("../models/m_student");

const getStudentLogin = async (req, res) => {
  try {
    const { email_id, password } = req.query;

    if (!email_id || !password) {
      return res.status(400).json({ msg: "Email And Password Are Required" });
    }

    const studentData = await student.findOne({ email_id }).exec();

    if (!studentData) {
      return res.status(404).json({ msg: "Invalid Email ID" });
    }

    if (studentData.password !== password) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const response = {
      user_id: studentData._id,
    };

    const token = Jwt.sign(response, process.env.SECRETE);

    return res.json({ response, token });
  } catch (error) {
    console.log("Error->>", error);
    return res?.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getStudentLogin };
