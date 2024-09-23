const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    logs: [
        {
            participant: String,
            role: String,
            action: String,  // 'entered', 'exited', 'class started', 'class ended'
            timestamp: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Classroom', classroomSchema);
