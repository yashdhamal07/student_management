const mongoose = require("mongoose")


const enrolledStudentSchema = new mongoose.Schema({

  
  student_id : {
    type : mongoose.Schema.Types.ObjectId,
    // type : String,
    required : true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
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
});

const enrolledStudent = new mongoose.model("enrolled_student", enrolledStudentSchema);

module.exports = enrolledStudent;
