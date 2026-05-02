const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const Student = require('./models/Student');

// Routes
app.get('/', (req, res) => {
  res.send('University Management API is running...');
});

// Dynamic endpoint for total university fees
app.get('/api/fees', async (req, res) => {
  try {
    const { enrollment } = req.query;
    
    // If enrollment is provided, fetch specific student's fees
    if (enrollment) {
      const student = await Student.findOne({ enrollment });
      if (student && student.fees) {
        let total = 0;
        if (student.fees.semester1) total += student.fees.semester1;
        if (student.fees.semester2) total += student.fees.semester2;
        if (student.fees.semester3) total += student.fees.semester3;
        
        return res.status(200).json({ totalFees: total });
      }
    }
    
    // Fallback: Generic fee
    res.status(200).json({
      totalFees: "1,20,000"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generic endpoint for required admission documents
app.get('/api/documents', (req, res) => {
  res.status(200).json({
    documents: [
      "Aadhaar Card",
      "10th Marksheet",
      "12th Marksheet",
      "Passport Photo"
    ]
  });
});

app.use('/api/students', studentRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
