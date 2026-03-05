import express from 'express';
import { addDoctor, addReceptionist, getDashboardStats, getUserByEmail, updateUserRole } from '../controllers/adminController.js';
// import { verifyAdmin } from '../middleware/auth.js'; // Future security ke liye

const router = express.Router();

// Admin only route
router.post('/add-doctor', addDoctor);

router.get("/stats", getDashboardStats);

router.post("/add-receptionist", addReceptionist);

router.get('/search-user', getUserByEmail);

router.patch('/update-role', updateUserRole);

export default router;