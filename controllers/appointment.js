const  mongoose  = require('mongoose');
const Appointment = require('../models/appointments');

//fetch all the appointments Appointments
exports.fetchAppointments = async (req, res) => {
    try {
        let userId= req.query.user_id
        const appointments = await Appointment.find({ user_id: userId })
                                     .sort({ start_time: -1 });
        res.status(200).json({message:"Success",data:appointments})
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'Server error' });
    }
};

// create appointment
exports.createAppointment = async (req, res) => {
    try {
        const { start_time, end_time, user_id, patient_id } = req.body;

        // Validate that start_time is before end_time
        if (new Date(start_time) >= new Date(end_time)) {
            return res.status(400).json({ error: "start_time must be before end_time" });
        }

        // Create a new appointment document
        const appointment = new Appointment({
            start_time: new Date(start_time),
            end_time: new Date(end_time),
            user_id,
            patient_id
        });
        console.log('appointment', appointment)


        // Save the appointment to the database
        await appointment.save();

        res.status(201).json({ message: "Appointment created successfully", appointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// soft delete
exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        
        const appointment = await Appointment.find({_id:new mongoose.Types.ObjectId(appointmentId), is_deleted: false });


        // Check if the appointment was found 
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        await Appointment.findOneAndUpdate({_id:new mongoose.Types.ObjectId(appointmentId)},{is_deleted:false});


        res.status(200).json({ message: "Appointment deleted successfully"});
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


