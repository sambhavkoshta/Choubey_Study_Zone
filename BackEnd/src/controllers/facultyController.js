import Faculty from "../models/Faculty.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ Add Faculty
export const addFaculty = async (req, res) => {
  try {
    const { name, subject, experience } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "faculty_images" });

    const faculty = new Faculty({ name, subject, experience, image: result.secure_url });
    await faculty.save();
    res.status(201).json({ message: "Faculty Added Successfully", faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Faculty with Search & Pagination
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Faculty
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject, experience } = req.body;
    let updatedData = { name, subject, experience };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "faculty_images" });
      updatedData.image = result.secure_url;
    }

    const faculty = await Faculty.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Faculty Updated Successfully", faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Faculty
export const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    await Faculty.findByIdAndDelete(id);
    res.status(200).json({ message: "Faculty Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
