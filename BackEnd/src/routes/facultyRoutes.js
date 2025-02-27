import express from "express";
import multer from "multer";
import { addFaculty, getAllFaculty, updateFaculty, deleteFaculty } from "../controllers/facultyController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), addFaculty);
router.get("/all", getAllFaculty);
router.put("/:id", upload.single("image"), updateFaculty);
router.delete("/:id", deleteFaculty);

export default router;
