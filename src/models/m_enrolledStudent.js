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
});

const enrolledStudent = new mongoose.model("enrolled_student", enrolledStudentSchema);

module.exports = enrolledStudent;
