const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    // type: String,
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    // type : String,
    required: true,
  },
  obtained_marks: {
    type: String,
    required: true,
  },
});

const result = new mongoose.model("result", resultSchema);

module.exports = result;
