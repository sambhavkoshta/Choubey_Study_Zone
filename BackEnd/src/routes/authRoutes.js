import express from "express";
import { 
  registerStudent, 
  loginStudent, 
  logout, 
  sendOTP, 
  sendResetOTP, 
  resendOTP,
  verifyOTP,
  resetPassword, 
  getProfile, 
  updateProfile,
  checkEnrollment,
  getEnrolledCourses
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/auth.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:100 , 
  message: "Too many OTP requests. Try again later.",
});

router.post("/send-otp", otpLimiter, sendOTP);
router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/forgot-password", otpLimiter, sendResetOTP);
router.post("/reset-password", resetPassword);
router.get("/check-enrollment", checkEnrollment);
router.use(verifyToken);
router.get("/profile", getProfile);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp",verifyOTP);
router.patch("/update-profile", updateProfile);
router.get("/enrolled-courses/:id", getEnrolledCourses);

router.post("/logout", logout);

export default router;
