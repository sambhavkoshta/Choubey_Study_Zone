import express from "express";
import { addFeedback,getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";
import { verifyToken } from "../middlewares/auth.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Student can submit feedback (Only Logged-in Users)
router.post("/", verifyToken, addFeedback);

// ✅ Admin can get all feedbacks
router.get("/", protectAdmin, getAllFeedbacks);

// ✅ Admin can delete feedback
router.delete("/:id", protectAdmin, deleteFeedback);

export default router;
