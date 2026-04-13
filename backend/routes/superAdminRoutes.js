import express from "express";
import { registerHospital } from "../controllers/superAdminContoller.js";

const supAdminRouter = express.Router();

supAdminRouter.post("/register-hospital", registerHospital);

export default supAdminRouter;