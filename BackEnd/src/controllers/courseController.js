import Course from "../models/course.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);
    const newCourse = new Course({
      title,
      description,
      price,
      image: result.secure_url,
    });

    await newCourse.save();
    res.status(201).json({ success: true, message: "Course created successfully", newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const { id } = req.params;

    let updatedCourse = { title, description, price };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedCourse.image = result.secure_url;
    }

    const course = await Course.findByIdAndUpdate(id, updatedCourse, { new: true });
    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getCourses = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category) {
      query.category = category;
    }
    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};


