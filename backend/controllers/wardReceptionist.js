import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js"

export const receptionistData = async (request, response) => {
    try {
        
        if(!req.user || req.user.id){
            return request.status(400).json({
                message : "User ID missing",
                status : false
            })
        }

        const receptionist = await userModel.findById(req.user.id);

        if(!receptionist){
            return response.status(404).json({
                message : "Repectionist not found",
                status : false,
            });
        }

        response.status(200).json({
            message : ""
        })
        

    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal server error",
            status : false,
            data : null
        })
    }
}


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


export const assignDoctor = async (request, response) => {
    try {
        const {id} = request.params
        const {doctor} = request.body 

        await Patient.findByIdAndUpdate(id, {doctor : doctor});

        response.status(200).json({
            message : "Assign Doctor to Patient Successfully!",
            status : true,
            
        })
    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal server error",
            status : false,
            data : null
        })
    }
}


export const todayPatients = async (request, response) => {
    try {
        
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0,);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const count = await Patient.countDocuments({
            createdAt : {$gte : startOfDay, $lte : endOfDay}
        })

        response.status(200).json({
            message : "Today Patients Count",
            data : count,
            status : true
        })

    } catch (error) {
        response.status(500).json({
            message : error.message || "Internal server error",
            status : false,
            data : null
        })
    }
}