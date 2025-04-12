import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact,
  getLocation,
} from "../controllers/contactController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", submitContact);
router.get("/location", getLocation);
router.get("/all", protectAdmin, getAllContacts);
router.get("/:id", protectAdmin, getContactById);
router.delete("/:id", protectAdmin, deleteContact);

export default router;
