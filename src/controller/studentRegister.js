const student = require("../models/m_student")

// insert new student(registration) function
const insertStudentRegister = async (req, res) => {
    try {
      const userdata = new student(req?.body);
      await userdata.save();
      return res?.status(200).json("Student Details Inserted Successfully..!!");
    } catch (err) {
      return res?.status(409).json({ message: err.message });
    }
  };

  module.exports = {insertStudentRegister}