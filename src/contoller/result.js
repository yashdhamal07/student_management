const result = require("../models/m_result");
// const { FetchUserId, FetchUserRole } = require("./decode_token");

const getResults = async (req,res)=> {
   try {
       const q1 = await result.find()
        return res?.status(200).json(q1)
   } catch (err) {
    return res?.status(400).json({message : err.message})
   }
}

const getResult = async (req,res)=> {
    try {
        const q1 = await result.findById(req.params.id)
        return res?.status(200).json(q1);
    } catch (err) {
        return res?.status(400).json({message : err.message})
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
        return res?.status(409).json({message : err.message})
    }
}

const deleteResult = async (req,res)=> {
    try {
        const q1 = await result.deleteOne({_id : req.params.id})
        return res?.status(200).json("Result Deleted Successfully..!!")
    } catch (err) {
        return res?.status(409).json({message : err.message})
    }
}

module.exports = {
   getResults,
    getResult,
    insertResult,
    updateResult,
    deleteResult
}