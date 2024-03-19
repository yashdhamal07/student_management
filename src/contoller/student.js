const student = require("../models/m_student");
// const { FetchUserId, FetchUserRole } = require("./decode_token");

const getStudents = async (req,res)=> {
   try {
       const q1 = await student.find()
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(500).json({message : err.message})
   }
}

const getStudent = async (req,res)=> {
    try {
        const q1 = await student.findById(req.params.id)
        return res?.status(200).json(q1);
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const insertStudent = async (req,res)=> {
    try {
        const userdata = new student(req?.body)
        await userdata.save();
        userdata.status = req?.body?.status || 1;
        // userdata.entry_by = FetchUserId(req?.headers["authorization"]);
        // userdata.role = FetchUserRole(req?.headers["authorization"]);
        return res?.status(200).json("Student Inserted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const updateStudent = async (req,res)=> {
    try {
        const userdata = req?.body;
        // userdata.update_by = FetchUserId(req?.headers["authorization"]);
        userdata.update_date = Date.now();
        await student.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Student Updated Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

const deleteStudent = async (req,res)=> {
    try {
        const q1 = await student.deleteOne({_id : req.params.id})
        return res?.status(200).json("Student Deleted Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

module.exports = {
   getStudents,
    getStudent,
    insertStudent,
    updateStudent,
    deleteStudent
}