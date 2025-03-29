import express from "express";
import { getAllEnrollments } from "../controllers/enrollmentController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET: Fetch all enrollments
router.get("/", protectAdmin, getAllEnrollments);

export default router;
