import express from "express"
import { signUpHandler, loginHandler, verificationHandler, resetOtp, forgotPassword, changePassword } from "../controller/auth.js";

const authRoute = express.Router();

authRoute.post("/sign-up", signUpHandler);

authRoute.post("/login", loginHandler); 

authRoute.post("/verify" , verificationHandler);

authRoute.post("/reset-otp", resetOtp);

authRoute.post("/forgot-password", forgotPassword);

authRoute.post("/change-password", changePassword);

export default authRoute 

