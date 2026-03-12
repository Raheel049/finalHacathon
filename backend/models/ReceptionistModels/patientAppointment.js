import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Doctor collection ka reference
        
    },
    doctorName : {
        type : String
    },
    // Format: YYYY-MM-DD (e.g., 2026-03-10)
    date: {
        type: String, 
        required: true 
    },
    // Format: HH:mm (e.g., 14:30 for 2:30 PM)
    time: {
        type: String,
        required: true 
    },
    wardName: {
        type: String,
        required: true
    },
    email : {
        type : String
    },
    // Default "Pending" - Doctor isay "Done" karega
    status: {
        type: String,
        enum: ["Pending", "In-Progress", "Done", "Cancelled"],
        default: "Pending"
    },
    feeStatus: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid"
    }
}, { timestamps: true });

const patientAppointment = mongoose.model("Appointment", appointmentSchema);

export default patientAppointment;