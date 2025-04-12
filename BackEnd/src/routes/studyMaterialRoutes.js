import express from "express";
import upload from "../middlewares/multer.middleware.js";
import {
  getStudyMaterials,
  addStudyMaterial,
  deleteStudyMaterial
} from "../controllers/studyMaterialController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", getStudyMaterials);
router.post("/", protectAdmin, upload.single("file"), addStudyMaterial);
router.delete("/:id", protectAdmin, deleteStudyMaterial);

export default router;
