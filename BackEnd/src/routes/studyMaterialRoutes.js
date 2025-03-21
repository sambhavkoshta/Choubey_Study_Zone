import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  getStudyMaterials,
  addStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial
} from "../controllers/studyMaterialController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Fetch all study materials (Public)
router.get("/", getStudyMaterials);

// ✅ Add Study Material (Only Admin)
router.post("/", protectAdmin, upload.single("file"), addStudyMaterial);

// ✅ Update Study Material (Only Admin)
router.put("/:id", protectAdmin, upload.single("file"), updateStudyMaterial);

// ✅ Delete Study Material (Only Admin)
router.delete("/:id", protectAdmin, deleteStudyMaterial);

export default router;
