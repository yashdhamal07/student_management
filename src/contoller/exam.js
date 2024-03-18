const exam = require("../models/m_exam");
// const { FetchUserId, FetchUserRole } = require("./decode_token");

const getExams = async (req,res)=> {
   try {
       const q1 = await exam.find()
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(400).json({message : err.message})
   }
}

const getExam = async (req,res)=> {
    try {
        const q1 = await exam.findById(req.params.id)
        return res?.status(200).json(q1);
    } catch (err) {
        return res?.status(400).json({message : err.message})
    }
}

const insertExam = async (req,res)=> {
    try {
        const userdata = new exam(req?.body)
        await userdata.save();
        userdata.status = req?.body?.status || 1;
        // userdata.entry_by = FetchUserId(req?.headers["authorization"]);
        // userdata.role = FetchUserRole(req?.headers["authorization"]);
        return res?.status(200).json("Exam Inserted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const updateExam = async (req,res)=> {
    try {
        const userdata = req?.body;
        // userdata.update_by = FetchUserId(req?.headers["authorization"]);
        userdata.update_date = Date.now();
        await exam.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Exam Updated Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const deleteExam = async (req,res)=> {
    try {
        const q1 = await exam.deleteOne({_id : req.params.id})
        return res?.status(200).json("Exam Deleted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

module.exports = {
   getExams,
    getExam,
    insertExam,
    updateExam,
    deleteExam
}