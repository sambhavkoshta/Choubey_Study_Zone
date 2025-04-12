import express from "express";
import { addFeedback,getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";
import { verifyToken } from "../middlewares/auth.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addFeedback);
router.get("/", protectAdmin, getAllFeedbacks);
router.delete("/:id", protectAdmin, deleteFeedback);

export default router;
