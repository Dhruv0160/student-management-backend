const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  enrollment: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  attendance: {
    type: Number,
    default: 85, // Default attendance percentage for mock data
  },
  fees: {
    semester1: { type: Number },
    semester2: { type: Number },
    semester3: { type: Number },
  },
  documents: {
    sem1: { marksheet: String, receipt: String },
    sem2: { marksheet: String, receipt: String },
  }
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
