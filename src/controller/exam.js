const { ObjectId } = require("mongodb");
const exam = require("../models/m_exam");

// for get all the exam details function
const getExams = async (req, res) => {
  try {
    const q1 = await exam.aggregate([
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $project: {
          exam_title: 1,
          subject_name: "$subject.subject_name",
          total_marks: 1,
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d", 
              date: "$exam_date"
            }
          }
        },
      },
    ]);
    return res?.status(200).json(q1);
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

// for get exam by ID function
const getExam = async (req, res) => {
  try {
    const Id = req.params.id;
    const q1 = await exam.aggregate([
      {
        $match: { _id: new ObjectId(Id) },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $project: {
          exam_title: 1,
          subject_name: "$subject.subject_name",
          total_marks: 1,
          exam_date: {
            $dateToString: {
              format: "%Y-%m-%d", 
              date: "$exam_date"
            }
          }
        },
      },
    ]);
    return res?.status(200).json(q1[0]);
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

// for insert new exam function
const insertExam = async (req, res) => {
  try {
    const userdata = new exam(req?.body);
    await userdata.save();
    return res?.status(200).json("New Exam Inserted Successfully..!!");
  } catch (err) {
    return res?.status(409).json({ message: err.message });
  }
};

// for update exam details function
const updateExam = async (req, res) => {
  try {
    const userdata = req?.body;
    await exam.updateOne({ _id: req.params.id }, userdata);
    return res?.status(200).json("Exam Details Updated Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};


// for  delete exam details function
const deleteExam = async (req, res) => {
  try {
    await exam.deleteOne({ _id: req.params.id });
    return res?.status(200).json("Exam Deleted Successfully..!!");
  } catch (err) {
    return res?.status(500).json({ message: err.message });
  }
};

module.exports = {
  getExams,
  getExam,
  insertExam,
  updateExam,
  deleteExam,
};
