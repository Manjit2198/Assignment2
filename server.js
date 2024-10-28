const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const appointment = require("./routes/appointment")

const app = express();
// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api',appointment);
// Start server
const PORT = 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
