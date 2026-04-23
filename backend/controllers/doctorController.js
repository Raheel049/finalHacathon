import Patient from "../models/patient.js"
import userModel from "../models/userSchema.js";

export const getPatientsInfo = async (request, response) => {
    try {
        const allPatientsData = await Patient.find();
        console.log("allPatients", allPatientsData);
        response.status(200).json({
            message : "patients data founds!",
            status : true,
            data : allPatientsData
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal Server error!",
            status : false
        })
    }
}

export const getCurrDoctData = async (request, response) => {
    try {
        const doctorId = request.user.id;
        const currentDoctor = await userModel.findById(doctorId).select("name email");
        console.log("doctor id",doctorId);
        response.status(200).json({
            message : "Data found success fully",
            status : true,
            data : currentDoctor
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal server error",
            status : false
        })
    }
}