import express from "express"
import { addPatient, createAppointment, fetchpatient, getAllAppointments, getAllDoctorsName } from "../controllers/receptionController.js"

const recpRouter = express()

recpRouter.post("/add-patient", addPatient);

recpRouter.get("/verify-patient", fetchpatient);

recpRouter.post("/patient-appointment", createAppointment);

recpRouter.get("/get-all-appointments", getAllAppointments);

recpRouter.get("/get-all-doctors-name", getAllDoctorsName);

export default recpRouter;