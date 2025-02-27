import express from "express";
import { createCourse, getAllCourses, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { getCourses } from "../controllers/courseController.js";
import upload from "../middlewares/upload.js"; // Multer Middleware for Image Upload

const router = express.Router();

router.post("/", upload.single("image"), createCourse);
router.get("/", getAllCourses);
router.get("/courses", getCourses);
router.put("/:id", upload.single("image"), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
