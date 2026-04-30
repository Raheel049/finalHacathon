import express from "express"
import { getAllPatients } from "../controllers/wardReceptionist.js"

const wardRecRoute = express()

wardRecRoute.get("/get-all-patients",getAllPatients);

export default wardRecRoute
