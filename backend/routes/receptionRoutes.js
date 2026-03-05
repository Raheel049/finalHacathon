import express from "express"
import { addPatient } from "../controllers/receptionController.js"

const recpRouter = express()

recpRouter.post("/add-patient", addPatient);

export default recpRouter