const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { classroomSocket } = require('./socket/classroomSocket');
const classroomRoutes = require('./routes/classroomRoutes');
const connectDB = require('./config/db');

// Setup Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/classroom', classroomRoutes);

// Socket IO
classroomSocket(io);

// Serve frontend (for testing)
app.use(express.static('public'));

// Start server
const PORT = 7000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
