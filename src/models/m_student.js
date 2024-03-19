const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({

  student_name: {
    type: String,
    required: true,
  },
  roll_no: {
    type : String,
    required : true
  },
  email_id: {
    type: String,
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
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
    required: true,
  },
  update_by: {
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
  },
  role: {
    type: Number,
    required: true,
  },
});

const student = new mongoose.model("student", studentSchema);

module.exports = student;
