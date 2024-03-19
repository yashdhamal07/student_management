const mongoose = require("mongoose")


const subjectSchema = new mongoose.Schema({

  subject_name: {
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
});

const subject = new mongoose.model("subject", subjectSchema);

module.exports = subject;
