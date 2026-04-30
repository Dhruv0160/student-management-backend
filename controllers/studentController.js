const Student = require('../models/Student');

// @desc    Get semester fees
// @route   GET /api/students/get-fees?enrollment=&sem=
// @access  Public
const getFees = async (req, res, next) => {
  try {
    const { enrollment, sem } = req.query;

    if (!enrollment || !sem) {
      res.status(400);
      throw new Error('Please provide enrollment and sem');
    }

    const student = await Student.findOne({ enrollment });

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    const validSemesters = ['semester1', 'semester2', 'semester3'];
    const semesterKey = `semester${sem}`;

    if (!validSemesters.includes(semesterKey)) {
      res.status(400);
      throw new Error('Invalid semester. Valid values for sem are 1, 2, 3');
    }

    const fee = student.fees && student.fees[semesterKey] !== undefined ? student.fees[semesterKey] : null;

    res.status(200).json({
      success: true,
      data: {
        enrollment: student.enrollment,
        semester: sem,
        fee: fee !== undefined ? fee : null
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student CGPA
// @route   GET /api/students/get-cgpa?enrollment=
// @access  Public
const getCgpa = async (req, res, next) => {
  try {
    const { enrollment } = req.query;

    if (!enrollment) {
      res.status(400);
      throw new Error('Please provide enrollment');
    }

    const student = await Student.findOne({ enrollment });

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    res.status(200).json({
      success: true,
      data: {
        enrollment: student.enrollment,
        cgpa: student.cgpa
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student marksheet URL
// @route   GET /api/students/get-marksheet?enrollment=&sem=
// @access  Public
const getMarksheet = async (req, res, next) => {
  try {
    const { enrollment, sem } = req.query;

    if (!enrollment || !sem) {
      res.status(400);
      throw new Error('Please provide enrollment and sem');
    }

    const student = await Student.findOne({ enrollment });

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    const validSemesters = ['sem1', 'sem2'];
    const semesterKey = `sem${sem}`;

    if (!validSemesters.includes(semesterKey)) {
      res.status(400);
      throw new Error('Invalid semester. Valid values for sem are 1, 2');
    }

    const documents = student.documents && student.documents[semesterKey] ? student.documents[semesterKey] : null;
    const marksheetUrl = documents && documents.marksheet ? documents.marksheet : null;

    res.status(200).json({
      success: true,
      data: {
        enrollment: student.enrollment,
        semester: sem,
        marksheetUrl: marksheetUrl || null
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify student exists
// @route   POST /api/students/verify-student
// @access  Public
const verifyStudent = async (req, res, next) => {
  try {
    const { enrollment } = req.body;

    if (!enrollment) {
      res.status(400);
      throw new Error('Please provide enrollment');
    }

    const studentExists = await Student.exists({ enrollment });

    res.status(200).json({
      success: true,
      data: {
        enrollment,
        exists: studentExists !== null
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFees,
  getCgpa,
  getMarksheet,
  verifyStudent
};
