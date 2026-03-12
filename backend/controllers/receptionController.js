import express from 'express';
import Patient from '../models/patient.js';
import patientAppointment from '../models/ReceptionistModels/patientAppointment.js';

export const addPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, email, bloodGroup, address } = req.body;

        // 1. Basic Validation
        if (!name || !age || !gender || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required fields (Name, Age, Gender, Phone)." 
            });
        }

        // 2. Check if patient already exists by phone
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ 
                success: false, 
                message: "Patient with this phone number and email  is already registered." 
            });
        }

        // 3. Create Patient
        const newPatient = new Patient({
            name,
            age,
            gender,
            phone,
            email,
            bloodGroup,
            address
        });

        await newPatient.save();

        res.status(201).json({
            success: true,
            message: "Patient registered successfully!",
            data: newPatient
        });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: err.message 
        });
    }
};


export const fetchpatient = async(req, res) => {
    try {

        const { email } = req.query;

        if(!email){
            return res.status(400).json({
                message : "Required fields are missing",
                success : false,
            
            })
        }

        const fetchPatient = await Patient.findOne({ email });
        if(!fetchPatient){
            return res.status(404).json({
                message : "Record not found",
                success : false,
            });
        }
        console.log(fetchPatient)

        res.status(200).json({
            success : true,
            message : "SuccessFully Patient Found!",
            data : fetchPatient
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server error",
            success : false,
            error : error.message


        })
    }
}



export const createAppointment = async (req, res) => {
    try {
        const { 
            patientId, 
            patientName, 
            doctorName, 
            date, 
            time, 
            wardName,
            feeStatus,
            status,
            patientMobile
        } = req.body;

        if(!patientId || !date || !time){
            return res.status(400).json({
                message : "Required fields are missing",
                success : false,
        });
        }

        const PATIENT_LIMIT = 50; // Doctor ki daily limit

        // 1. Check karo ke us din (Date) us Doctor ki kitni appointments ho chuki hain
        const appointmentCount = await patientAppointment.countDocuments({
            doctorName: doctorName,
            date: date
        });

        // 2. Agar count 50 ya us se zyada hai, toh error bhej do
        if (appointmentCount >= PATIENT_LIMIT) {
            return res.status(400).json({
                success: false,
                message: `Sorry! Dr. ${doctorName} has reached the maximum limit of ${PATIENT_LIMIT} patients for this date (${date}).`
            });
        }

        // 3. Agar limit ke andar hai, toh check karo patient pehle se register hai
        const patientExists = await Patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({ success: false, message: "Patient not found!" });
        }

        // 4. Appointment save karo
        const newAppointment = new patientAppointment({
            patientId,
            patientName,
            doctorName,
            date,
            time,
            wardName,
            status,
            feeStatus,
            patientMobile,
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: "Appointment booked successfully!",
            remainingSlots: PATIENT_LIMIT - (appointmentCount + 1) // Frontend ko slots batane ke liye
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Sab appointments dekhne ka function (With Populate Magic)
export const getAllAppointments = async (req, res) => {
    try {
        // .populate() ki wajah se humein ID ki jagah poora object milega
        const appointments = await patientAppointment.find()
            .populate("patientId", "name email phone") // Sirf name, email, phone uthao
            // .populate("doctorId", "name specialization");

        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};