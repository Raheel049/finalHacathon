import express from "express";
import { fetchAllOwners, registerHospital } from "../controllers/superAdminContoller.js";

const supAdminRouter = express.Router();

supAdminRouter.post("/register-hospital", registerHospital);

supAdminRouter.get("/fetch-all-owners", fetchAllOwners);

export default supAdminRouter;