import Doctor from "../models/doctor.js";
import Receptionist from '../models/receptionist.js';
import bcrypt from "bcrypt"
import userModel from "../models/userSchema.js";
import Patient from "../models/patient.js";
import patientAppointment from "../models/ReceptionistModels/patientAppointment.js";


export const addDoctor = async (req, res) => {
    try {
        const { name, email, phoneNumber, specialization, gender, experience } = req.body;

        // 1. Strict Requirement Check
        if (!specialization || !gender) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields. Name, Email, Phone, Specialization, and Gender are mandatory." 
            });
        }

        // 2. Email Format Verification
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ success: false, message: "Invalid email format." });
        // }

        // 3. Duplicate Check
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: "A doctor with this email is already registered." });
        }

        // 4. Creation
        const newDoctor = new Doctor({
            name,
            email,
            phoneNumber,
            specialization,
            gender,
            experience: experience || 0
        });

        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: "Doctor added successfully to the SaaS platform!",
            data: newDoctor
        });

    } catch (err) {
        // console.error("Add Doctor Error:", err);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: err.message 
        });
    }
};

export const searchDoctor = async (req, res) => {
    try {
        const {email} = req.query;

        if(!email){
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields." 
            });
        }

        const data = await userModel.findOne({ email });
        console.log("data", data);

       res.status(200).json({
        success : true,
        message : "User Found Success",
        data : data
       })

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        // Sirf doctors ki total counting
        const doctorCount = await Doctor.countDocuments();

        const response = await Patient.countDocuments();

        const totalAppointments = await  patientAppointment.countDocuments()


        // Agar aapne users table mein roles rakhe hain toh aise bhi kar sakte hain:
        // const doctorCount = await User.countDocuments({ role: 'doctor' });

        res.status(200).json({
            success: true,
            data: {
                totalDoctors: doctorCount,
                totalPatients: response,
                totalAppointments : totalAppointments,
                // Aap yahan mazeed stats bhi add kar sakte hain:
                // totalPatients: 0, 
                // totalAppointments: 0
            }
        });
        console.log(doctorCount);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Stats fetch karne mein masla hua",
            error: err.message
        });
    }
};



export const addReceptionist = async (req, res) => {
    try {
        const { name, email, phone, shift } = req.body;

        // 1. Validation Check
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: "Required fields are missing!" });
        }

        // 2. Duplicate Check
        const existingRec = await Receptionist.findOne({ email });
        if (existingRec) {
            return res.status(400).json({ success: false, message: "Receptionist already exists!" });
        }

        const newReceptionist = new Receptionist({
            name,
            email,
            phone,
            shift,
            role: 'receptionist' // Auto-assign role
        });

        await newReceptionist.save();
        res.status(201).json({ success: true, message: "Receptionist added successfully!" });

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


// 1. Search User by Email
export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userModel.findOne({ email }).select('name email phoneNumber role'); // Sirf zaroori 4 fields
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 2. Update User Role
export const updateUserRole = async (req, res) => {
    try {
        const { userId, newRole, userEmail } = req.body;
        
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { role: newRole }, 
            { new: true }
        );

        res.status(200).json({ 
            success: true, 
            message: `User is now a ${newRole}`,
            user: updatedUser 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const getAllPatients = async (req, res) => {
    try {

        const response = await Patient.find();

        res.status(200).json({
            message: "All patients are found",
            success : true,
            data : response
        })

    } catch (error) {
       return res.status(500).json({ success: false, error: err.message });
        
    }
}

export const deletePatient = async (req, res) => {
    try {

        const {id} = req.query

        if(!id){
           return res.status(400).json({
                success : false,
                message : "Required field are missing"
            });
        }

        const patient = await Patient.findByIdAndDelete(id);

        res.status(200).json({
            message : "Patient Deleted",
            success : true

        })

        

    } catch (error) {
       return res.status(500).json({ success: false, error: err.message });
        
    }
}

