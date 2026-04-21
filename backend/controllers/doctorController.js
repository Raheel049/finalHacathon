import Patient from "../models/patient.js"

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