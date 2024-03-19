const Jwt = require("jsonwebtoken");
const student = require("../models/m_student");

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
      user_id: user._id,
    //   role: user.role,
    };

    const token = Jwt.sign(user_response, process.env.SECRETE);

    return res.json({ user: user_response, token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getStudentLogin };
