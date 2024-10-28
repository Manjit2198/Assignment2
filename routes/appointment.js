const express = require('express');
const { createAppointment,fetchAppointments,deleteAppointment } = require('../controllers/appointment');
const router = express.Router();

router.get('/fetch-appointments', fetchAppointments);
router.post('/create-appointment', createAppointment);
router.delete('/delete-appointment/:appointmentId', deleteAppointment);

module.exports = router;
