import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
  getLocation,
} from "../controllers/contactController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js"; // Admin Authorization Middleware

const router = express.Router();

// 📌 Public Routes
router.post("/submit", submitContact);
router.get("/location", getLocation); // Ensure location route is above dynamic routes

// 📌 Admin Protected Routes
router.get("/all", protectAdmin, getAllContacts);
router.get("/:id", protectAdmin, getContactById);
router.delete("/:id", protectAdmin, deleteContact);

export default router;
