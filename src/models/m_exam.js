const mongoose = require("mongoose")


const examSchema = new mongoose.Schema({

  exam_title : {
    type : String,
    required : true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    required: true,
  },
 exam_date : {
    type: Date,
    default : Date.now,
    required: true,
  },
  total_marks : {
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

const exam = new mongoose.model("exam", examSchema);

module.exports = exam;
