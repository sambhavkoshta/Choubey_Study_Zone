import express from "express";
import { loginAdmin, logoutAdmin, refreshAdminToken, forgotPassword, resetPassword, getAdminProfile, getAdminStats  } from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { getAllStudents, updateStudent, deleteStudent } from "../controllers/adminController.js";

const router = express.Router();
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAdminToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/profile", protectAdmin, getAdminProfile);
router.get("/stats", protectAdmin, getAdminStats);
router.get("/students", protectAdmin, getAllStudents);
router.put("/students/:id", protectAdmin, updateStudent);
router.delete("/students/:id", protectAdmin, deleteStudent);

export default router;
