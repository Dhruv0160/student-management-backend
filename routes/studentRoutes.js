const express = require('express');
const router = express.Router();
const { getFees, getCgpa, getMarksheet, verifyStudent, getDetails } = require('../controllers/studentController');

// GET /api/students/get-details?enrollment=&sem=
router.get('/get-details', getDetails);

// GET /api/students/get-fees?enrollment=&sem=
router.get('/get-fees', getFees);

// GET /api/students/get-cgpa?enrollment=
router.get('/get-cgpa', getCgpa);

// GET /api/students/get-marksheet?enrollment=&sem=
router.get('/get-marksheet', getMarksheet);

// POST /api/students/verify-student
router.post('/verify-student', verifyStudent);

module.exports = router;
