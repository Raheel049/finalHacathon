import express from "express";
import { getOwnerStats, fetchAllOwners, registerHospital, getOwnerData, updateOwnerData, deleteOwner } from "../controllers/superAdminContoller.js";

const supAdminRouter = express.Router();

supAdminRouter.post("/register-hospital", registerHospital);

supAdminRouter.get("/fetch-all-owners", fetchAllOwners);

supAdminRouter.get("/owner-stats", getOwnerStats);

supAdminRouter.post("/get-owner-data/:id", getOwnerData)

supAdminRouter.patch("/update-owner-data/:id", updateOwnerData);

supAdminRouter.delete("/delete-owner/:id", deleteOwner);

export default supAdminRouter;