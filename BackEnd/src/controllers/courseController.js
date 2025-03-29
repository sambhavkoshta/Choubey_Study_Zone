import Course from "../models/course.model.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ 1. Create a Course
export const createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path); // Upload Image to Cloudinary

    const newCourse = new Course({
      title,
      description,
      price,
      image: result.secure_url, // Save Cloudinary Image URL
    });

    await newCourse.save();
    res.status(201).json({ success: true, message: "Course created successfully", newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};



// ✅ 2. Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// ✅ 3. Update a Course
export const updateCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const { id } = req.params;

    let updatedCourse = { title, description, price };

    // If image is uploaded, update it in Cloudinary
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

// export const updateCourse = async (req, res) => {
//   try {
//     const { title, description, price, eligibility, examPattern, preparationTips } = req.body;
//     const { id } = req.params;

//     let updatedCourse = { title, description, price };

//     // यदि नई eligibility, examPattern, preparationTips दी गई हैं, तो उन्हें अपडेट करें
//     if (eligibility) updatedCourse.eligibility = JSON.parse(eligibility);
//     if (examPattern) updatedCourse.examPattern = JSON.parse(examPattern);
//     if (preparationTips) updatedCourse.preparationTips = JSON.parse(preparationTips);

//     // यदि नई image अपलोड हुई है, तो उसे Cloudinary पर अपडेट करें
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       updatedCourse.image = result.secure_url;
//     }

//     const course = await Course.findByIdAndUpdate(id, updatedCourse, { new: true });

//     if (!course) {
//       return res.status(404).json({ success: false, message: "Course not found" });
//     }

//     res.status(200).json({ success: true, message: "Course updated successfully", course });
//   } catch (error) {
//     console.error("❌ Error updating course:", error);
//     res.status(500).json({ success: false, message: "Server Error", error });
//   }
// };


// ✅ 4. Delete a Course
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

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};


