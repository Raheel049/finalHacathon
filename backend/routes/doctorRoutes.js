import express from "express"
import { getCurrDoctData, getPatientsInfo } from "../controllers/doctorController.js"
import { protect } from "../middleware/authMiddleware.js";

const doctorRoute = express()

doctorRoute.get("/get-patient-info", getPatientsInfo);

doctorRoute.get("/curr-doctor-data",protect, getCurrDoctData);

export default doctorRoute