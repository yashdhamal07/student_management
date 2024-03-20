const { ObjectId } = require("mongodb");
const result = require("../models/m_result");

// For Get All result data..
const getResults = async (req, res) => {
  try {
    const q1 = await result.aggregate([
      {
        $lookup: {
          from: "exams",
          localField: "exam_id",
          foreignField: "_id",
          as: "exam",
        },
      },
      {
        $unwind: "$exam",
      },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "exam.subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $project: {
          _id: 1,
          student_id : "$student._id",
          student_name: "$student.student_name",
          roll_no: "$student.roll_no",
          email_id: "$student.email_id",
          subject_name: "$subject.subject_name",
          exam_title: "$exam.exam_title",
          total_marks: "$exam.total_marks",
          obtained_marks: 1,
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d", 
              date: "$exam.exam_date",
            },
          },
        },
      },
    ]);
    return res?.status(200).json(q1);
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

// For get results by _id(results)
const getResult = async (req, res) => {
  try {
    const Id = req.params.id;
    const q1 = await result.aggregate([
      {
        $match: { _id: new ObjectId(Id) },
      },
      {
        $lookup: {
          from: "exams",
          localField: "exam_id",
          foreignField: "_id",
          as: "exam",
        },
      },
      {
        $unwind: "$exam",
      },
      {
        $lookup: {
          from: "students",
          localField: "student_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $lookup: {
          from: "subjects",
          localField: "exam.subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $project: {
          _id: 0,
          student_name: "$student.student_name",
          roll_no: "$student.roll_no",
          email_id: "$student.email_id",
          subject_name: "$subject.subject_name",
          exam_title: "$exam.exam_title",
          total_marks: "$exam.total_marks",
          obtained_marks: 1,
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d", 
              date: "$exam.exam_date",
            },
          },
        },
      },
    ]);
    return res?.status(200).json(q1[0]);
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

// for insert result function
const insertResult = async (req, res) => {
  try {
    const userdata = new result(req?.body);
    await userdata.save();
    return res?.status(200).json("Result Added Successfully..!!");
  } catch (err) {
    return res?.status(409).json({ message: err.message });
  }
};

// for update result details function
const updateResult = async (req, res) => {
  try {
    const userdata = req?.body;
    await result.updateOne({ _id: req.params.id }, userdata);
    return res?.status(200).json("Result Updated Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

// for delete results function
const deleteResult = async (req, res) => {
  try {
    const q1 = await result.deleteOne({ _id: req.params.id });
    return res?.status(200).json("Result Deleted Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

module.exports = {
  getResults,
  getResult,
  insertResult,
  updateResult,
  deleteResult,
};
