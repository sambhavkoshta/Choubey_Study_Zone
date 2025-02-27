import express from "express";
import { uploadStudyMaterial, getStudyMaterials, deleteStudyMaterial } from "../controllers/studyMaterialController.js";
import upload from "../middlewares/upload.js"; // Multer Middleware for File Upload

const router = express.Router();

// ✅ Upload Study Material
router.post("/upload", upload.single("file"), uploadStudyMaterial);

// ✅ Get Study Materials for a Course
router.get("/:courseId", getStudyMaterials);

// ✅ Delete Study Material
router.delete("/:id", deleteStudyMaterial);

export default router;
