const Classroom = require('../models/classroomModel');

let classrooms = {};

const classroomSocket = (io) => {
    io.on('connection', (socket) => {
        socket.on('joinClass', async ({ roomId, role, name }) => {
            if (!classrooms[roomId]) {
                classrooms[roomId] = { teacherList: [], studentList: [], classStarted: false };
            }

            const classroom = classrooms[roomId];

            if (role === 'teacher') {
                classroom.teacherList.push(name);
                await logEvent(roomId, name, role, 'entered');
                io.in(roomId).emit('updateClass', classroom);
            } else if (role === 'student') {
                if (classroom.classStarted) {
                    classroom.studentList.push(name);
                    await logEvent(roomId, name, role, 'entered');
                    io.in(roomId).emit('updateClass', classroom);
                } else {
                    socket.emit('permissionDenied', 'Class has not started yet.');
                }
            }

            socket.join(roomId);
        });

        socket.on('startClass', async (roomId) => {
            const classroom = classrooms[roomId];
            classroom.classStarted = true;
            await logEvent(roomId, 'teacher', 'teacher', 'class started');
            io.in(roomId).emit('classStarted');
        });

        socket.on('endClass', async (roomId) => {
            const classroom = classrooms[roomId];
            classroom.classStarted = false;
            await logEvent(roomId, 'teacher', 'teacher', 'class ended');
            io.in(roomId).emit('classEnded');
        });

        socket.on('leaveClass', async ({ roomId, role, name }) => {
            const classroom = classrooms[roomId];
            if (role === 'teacher') {
                classroom.teacherList = classroom.teacherList.filter(t => t !== name);
            } else if (role === 'student') {
                classroom.studentList = classroom.studentList.filter(s => s !== name);
            }
            await logEvent(roomId, name, role, 'exited');
            io.in(roomId).emit('updateClass', classroom);
        });
    });
};

const logEvent = async (roomId, participant, role, action) => {
    const classroom = await Classroom.findOne({ roomId });
    if (classroom) {
        classroom.logs.push({ participant, role, action });
        await classroom.save();
    } else {
        await Classroom.create({ roomId, logs: [{ participant, role, action }] });
    }
};

module.exports = { classroomSocket };
