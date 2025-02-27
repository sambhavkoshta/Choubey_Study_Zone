import express from "express";
import { getFeedbacks, addFeedback } from "../controllers/feedbackController.js";
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getFeedbacks);
// router.post("/", protect, addFeedback);

export default router;
