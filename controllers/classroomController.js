const Classroom = require('../models/classroomModel');

exports.getClassroomLogs = async (req, res) => {
    try {
        const { roomId } = req.params;
        const classroom = await Classroom.findOne({ roomId });
        if (classroom) {
            res.json(classroom.logs);
        } else {
            res.status(404).json({ message: 'Classroom not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
