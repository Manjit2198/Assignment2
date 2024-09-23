const express = require('express');
const { getClassroomLogs } = require('../controllers/classroomController');
const router = express.Router();

router.get('/:roomId/logs', getClassroomLogs);

module.exports = router;
