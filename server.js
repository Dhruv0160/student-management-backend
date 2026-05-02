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

// Routes
app.get('/', (req, res) => {
  res.send('University Management API is running...');
});

// Generic endpoint for total university fees
app.get('/api/fees', (req, res) => {
  res.status(200).json({
    totalFees: "1,20,000"
  });
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
