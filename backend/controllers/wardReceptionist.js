import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js"


export const getAllPatients = async (request, response) => {
    try {
        const allPatients = await Patient.find();
        const totalPatients = await Patient.countDocuments();
        const doctors = await Doctor.find();


        response.status(200).json({
            message : "Patients Founds",
            status : true,
            data : allPatients,
            stats : totalPatients,
            doctors : doctors
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal server error",
            status : false,
            data : null
        })
    }
}