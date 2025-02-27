// backend/routes/adminRoutes.js
import express from "express";
import { loginAdmin, getAdminProfile, refreshAdminToken, logoutAdmin } from "../controllers/adminController.js";
import protectAdmin from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh-token", refreshAdminToken);
router.get("/profile", protectAdmin, getAdminProfile);
router.post("/logout", logoutAdmin);

export default router;
