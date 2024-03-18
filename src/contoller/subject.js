const subject = require("../models/m_subject");
// const { FetchUserId, FetchUserRole } = require("./decode_token");

const getSubjects = async (req,res)=> {
   try {
       const q1 = await subject.find()
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(400).json({message : err.message})
   }
}

const getSubject = async (req,res)=> {
    try {
        const q1 = await subject.findById(req.params.id)
        return res?.status(200).json(q1);
    } catch (err) {
        return res?.status(400).json({message : err.message})
    }
}

const insertSubject = async (req,res)=> {
    try {
        const userdata = new subject(req?.body)
        await userdata.save();
        userdata.status = req?.body?.status || 1;
        // userdata.entry_by = FetchUserId(req?.headers["authorization"]);
        // userdata.role = FetchUserRole(req?.headers["authorization"]);
        return res?.status(200).json("Subject Inserted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const updateSubject = async (req,res)=> {
    try {
        const userdata = req?.body;
        // userdata.update_by = FetchUserId(req?.headers["authorization"]);
        userdata.update_date = Date.now();
        await subject.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Subject Updated Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

const deleteSubject = async (req,res)=> {
    try {
        const q1 = await subject.deleteOne({_id : req.params.id})
        return res?.status(200).json("Subject Deleted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

module.exports = {
   getSubjects,
    getSubject,
    insertSubject,
    updateSubject,
    deleteSubject
}