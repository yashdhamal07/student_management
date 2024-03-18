const mongoose = require("mongoose")


const examSchema = new mongoose.Schema({

  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  student_id : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
  },
 exam_date : {
    type: Date,
    default : Date.now,
    required: true,
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
    // type: mongoose.Schema.Types.ObjectId,
    type : String,
    required: true,
  },
  update_by: {
    // type: mongoose.Schema.Types.ObjectId,
    type : String,
  },
//   role: {
//     type: Number,
//     required: true,
//   },
});

const exam = new mongoose.model("exam", examSchema);

module.exports = exam;
