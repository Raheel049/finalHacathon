import express from "express"
import { addPatient, createAppointment, fetchpatient, getAllAppointments } from "../controllers/receptionController.js"

const recpRouter = express()

recpRouter.post("/add-patient", addPatient);

recpRouter.get("/verify-patient", fetchpatient);

recpRouter.post("/patient-appointment", createAppointment);

recpRouter.get("/get-all-appointments", getAllAppointments)

export default recpRouter;