import express from "express";
import { createCourse, getAllCourses, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { getCourses } from "../controllers/courseController.js";
import upload from "../middlewares/upload.js"; // Multer Middleware for Image Upload
import Course from "../models/course.model.js";

const router = express.Router();

router.post("/", upload.single("image"), createCourse);
router.get("/", getAllCourses);
router.get("/courses", getCourses);
// Backend Route (Express.js)
router.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", upload.single("image"), updateCourse);
router.delete("/:id", deleteCourse);

export default router;
