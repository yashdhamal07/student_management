const { ObjectId } = require("mongodb");
const result = require("../models/m_result");
// const { FetchUserId, FetchUserRole } = require("./decode_token");


// For Get All result data..
const getResults = async (req,res)=> {
   try {
       const q1 = await result.aggregate([
        {
          $lookup: {
            from: "exams",
            localField: "exam_id",
            foreignField: "_id",
            as: "exam"
          }
        },
        {
          $unwind: "$exam"
        },
        {
          $lookup: {
            from: "students",
            localField: "student_id",
            foreignField: "_id",
            as: "student"
          }
        },
        {
          $unwind: "$student"
        },
        {
          $lookup: {
            from: "subjects",
            localField: "exam.subject_id",
            foreignField: "_id",
            as: "subject"
          }
        },
        {
          $unwind: "$subject"
        },
        {
          $project: {
            "_id": 1,
            "student_name": "$student.student_name",
            "roll_no": "$student.roll_no",
            "email_id": "$student.email_id",
            "subject_name": "$subject.subject_name",
            "exam_title": "$exam.exam_title",
            "total_marks": "$exam.total_marks",
            "exam_date": "$exam.exam_date",
            "obtained_marks": 1
          }
        }
      ])
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(500).json({message : err.message})
   }
}

// For get results by _id(results)
const getResult = async (req,res)=> {
    try {
        const Id = req.params.id
        const q1 = await result.aggregate([
            {
              $match: {_id : new ObjectId(Id)}
            },
            {
              $lookup: {
                from: "exams",
                localField: "exam_id",
                foreignField: "_id",
                as: "exam"
              }
            },
            {
              $unwind: "$exam"
            },
            {
              $lookup: {
                from: "students",
                localField: "student_id",
                foreignField: "_id",
                as: "student"
              }
            },
            {
              $unwind: "$student"
            },
            {
              $lookup: {
                from: "subjects",
                localField: "exam.subject_id",
                foreignField: "_id",
                as: "subject"
              }
            },
            {
              $unwind: "$subject"
            },
            {
              $project: {
                "_id": 0,
                "student_name": "$student.student_name",
                "roll_no": "$student.roll_no",
                "email_id": "$student.email_id",
                "subject_name": "$subject.subject_name",
                "exam_title": "$exam.exam_title",
                "total_marks": "$exam.total_marks",
                "exam_date": "$exam.exam_date",
                "obtained_marks": 1
              }
            }
          ])          
        return res?.status(200).json(q1[0]);
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const insertResult = async (req,res)=> {
    try {
        const userdata = new result(req?.body)
        await userdata.save();
        userdata.status = req?.body?.status || 1;
        // userdata.entry_by = FetchUserId(req?.headers["authorization"]);
        // userdata.role = FetchUserRole(req?.headers["authorization"]);
        return res?.status(200).json("Result Added Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const updateResult = async (req,res)=> {
    try {
        const userdata = req?.body;
        // userdata.update_by = FetchUserId(req?.headers["authorization"]);
        userdata.update_date = Date.now();
        await result.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Result Updated Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const deleteResult = async (req,res)=> {
    try {
        const q1 = await result.deleteOne({_id : req.params.id})
        return res?.status(200).json("Result Deleted Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

module.exports = {
   getResults,
    getResult,
    insertResult,
    updateResult,
    deleteResult
}