import express from "express"
import { assignDoctor, getAllPatients, receptionistData, todayPatients } from "../controllers/wardReceptionist.js"

const wardRecRoute = express()

wardRecRoute.get("/get-all-patients",getAllPatients);

wardRecRoute.post("/assign-doctor/:id",assignDoctor);

wardRecRoute.get("/today-patients", todayPatients);

wardRecRoute.get("/ward-reception-data", receptionistData);

export default wardRecRoute
