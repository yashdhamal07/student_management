const { ObjectId } = require("mongodb");
const enrolledStudent = require("../models/m_enrolledStudent");
// const { FetchUserId, FetchUserRole } = require("./decode_token");

const getEnrolledStudents = async (req,res)=> {
   try {
       const q1 = await enrolledStudent.aggregate([
        {
          $lookup: {
            from: "enrolled_students",
            localField: "student_id",
            foreignField: "student_id",
            as: "enrolled"
          }
        },
        {
          $lookup: {
            from: "students",
            localField: "student_id",
            foreignField: "_id",
            as: "student_details"
          }
        },
        {
          $unwind: "$student_details"
        },
        {
          $lookup: {
            from: "subjects",
            localField: "subject_id",
            foreignField: "_id",
            as: "subject_details"
          }
        },
        {
          $unwind: "$subject_details"
        },
        {
          $project: {
            "student_name": "$student_details.student_name",
            "roll_no": "$student_details.roll_no",
            "subject_name": "$subject_details.subject_name",
            "message": {
              $cond: {
                if: { $gt: [{ $size: "$enrolled" }, 0] },
                then: "Student is enrolled for the exam.",
                else: "Student is not enrolled for the exam."
              }
            }
          }
        }
      ])      
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(500).json({message : err.message})
   }
}

const getEnrolledStudent = async (req,res)=> {
    try {
        const Id = req.params.id
        const q1 = await enrolledStudent.aggregate([
            {
              $match: { _id:  new ObjectId(Id)}
            },
            {
              $lookup: {
                from: "enrolled_students",
                localField: "student_id",
                foreignField: "student_id",
                as: "enrolled"
              }
            },
            {
              $lookup: {
                from: "students",
                localField: "student_id",
                foreignField: "_id",
                as: "student_details"
              }
            },
            {
              $unwind: "$student_details"
            },
            {
              $lookup: {
                from: "subjects",
                localField: "subject_id",
                foreignField: "_id",
                as: "subject_details"
              }
            },
            {
              $unwind: "$subject_details"
            },
            {
              $project: {
                "student_name": "$student_details.student_name",
                "roll_no": "$student_details.roll_no",
                "subject_name": "$subject_details.subject_name",
                "message": {
                  $cond: {
                    if: { $gt: [{ $size: "$enrolled" }, 0] },
                    then: "Student is enrolled for the exam.",
                    else: "Student is not enrolled for the exam."
                  }
                }
              }
            }
          ])          
        return res?.status(200).json(q1[0]);
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const insertEnrolledStudent = async (req,res)=> {
    try {
        const userdata = new enrolledStudent(req?.body)
        await userdata.save();
        userdata.status = req?.body?.status || 1;
        // userdata.entry_by = FetchUserId(req?.headers["authorization"]);
        // userdata.role = FetchUserRole(req?.headers["authorization"]);
        return res?.status(200).json("Student Enrolled Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const updateEnrolledStudent = async (req,res)=> {
    try {
        const userdata = req?.body;
        // userdata.update_by = FetchUserId(req?.headers["authorization"]);
        userdata.update_date = Date.now();
        await enrolledStudent.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Student Enrolled Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const deleteEnrolledStudent = async (req,res)=> {
    try {
        const q1 = await enrolledStudent.deleteOne({_id : req.params.id})
        return res?.status(200).json("Student Enrolled Remove Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

module.exports = {
   getEnrolledStudents,
    getEnrolledStudent,
    insertEnrolledStudent,
    updateEnrolledStudent,
    deleteEnrolledStudent
}