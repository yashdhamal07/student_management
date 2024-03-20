const subject = require("../models/m_subject");

// get all subject function
const getSubjects = async (req,res)=> {
   try {
       const q1 = await subject.find()
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(500).json({message : err.message})
   }
}


// get subject by ID function
const getSubject = async (req,res)=> {
    try {
        const q1 = await subject.findById(req.params.id)
        return res?.status(200).json(q1);
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}


// insert new subject function
const insertSubject = async (req,res)=> {
    try {
        const userdata = new subject(req?.body)
        await userdata.save();
        return res?.status(200).json("New Subject Inserted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

// update subject function
const updateSubject = async (req,res)=> {
    try {
        const userdata = req?.body;
        await subject.updateOne({_id : req.params.id},userdata);
        return res?.status(200).json("Subject Details Updated Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}


// delete subject function
const deleteSubject = async (req,res)=> {
    try {
        const q1 = await subject.deleteOne({_id : req.params.id})
        return res?.status(200).json("Subject Deleted Successfully..!!")
    } catch (err) {
        return res?.status(500).json({message : err.message})
    }
}

module.exports = {
   getSubjects,
    getSubject,
    insertSubject,
    updateSubject,
    deleteSubject
}