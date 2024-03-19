const mongoose = require("mongoose")


const resultSchema = new mongoose.Schema({


  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    required: true,
  },
 student_id : {
  type : mongoose.Schema.Types.ObjectId,
  // type : String,
    required: true,
  },
  obtained_marks : {
    type : String,
    required : true
  },
  status: {
    type: Number,
    required: true,
  },
  entry_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
  entry_by: {
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
    required: true,
  },
  update_by: {
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
  },

});

const result = new mongoose.model("result", resultSchema);

module.exports = result;
