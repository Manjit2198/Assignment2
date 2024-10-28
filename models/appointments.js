const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    start_time:{type:Date,required: true},
    end_time:{type:Date,required: true},
    is_deleted:{type:Boolean,default:false}
},{ timestamps: true });

appointmentSchema.index({user_id: 1,start_time:-1});

module.exports = mongoose.model('Appointment', appointmentSchema);
