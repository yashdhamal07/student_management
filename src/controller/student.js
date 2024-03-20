const student = require("../models/m_student");
const logger = require("./logger");

// get all students function
const getStudents = async (req, res) => {
  try {
    const q1 = await student.find();
    logger.studentManagementLogger.info("Get Student List Successfully..");
    return res?.status(200).json(q1);
  } catch (err) {
    logger.studentManagementLogger.error(
      "Error For Finding Data Of Students.."
    );
    return res?.status(500).json({ message: err.message });
  }
};

// get student by ID function
const getStudent = async (req, res) => {
  try {
    const q1 = await student.findById(req.params.id);
    logger.studentManagementLogger.info("Get Student Successfully..");
    return res?.status(200).json(q1);
  } catch (err) {
    logger.studentManagementLogger.error(
      "Error For Finding Data Of Students.."
    );
    return res?.status(500).json({ message: err.message });
  }
};


// update student function
const updateStudent = async (req, res) => {
  try {
    const userdata = req?.body;
    await student.updateOne({ _id: req.params.id }, userdata);
    return res?.status(200).json("Student Details Updated Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};


// delete student function..
const deleteStudent = async (req, res) => {
  try {
    const q1 = await student.deleteOne({ _id: req.params.id });
    return res?.status(200).json("Student Deleted Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
