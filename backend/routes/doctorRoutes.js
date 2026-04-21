import express from "express"
import { getPatientsInfo } from "../controllers/doctorController.js"

const doctorRoute = express()

doctorRoute.get("/get-patient-info", getPatientsInfo);

export default doctorRoute