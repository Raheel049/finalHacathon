import express from "express";
import { getOwnerStats, fetchAllOwners, registerHospital } from "../controllers/superAdminContoller.js";

const supAdminRouter = express.Router();

supAdminRouter.post("/register-hospital", registerHospital);

supAdminRouter.get("/fetch-all-owners", fetchAllOwners);

supAdminRouter.get("/owner-stats", getOwnerStats);

export default supAdminRouter;