import { StudyMaterial } from "../models/StudyMaterial.js";
import cloudinary from "../utils/cloudinary.js";

// 📌 Get All Study Materials
export const getStudyMaterials = async (req, res) => {
  try {
    const notes = await StudyMaterial.find({ category: "notes" });
    const videos = await StudyMaterial.find({ category: "videos" });
    const syllabus = await StudyMaterial.find({ category: "syllabus" });

    res.status(200).json({ notes, videos, syllabus });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch study materials" });
  }
};

// 📌 Add Study Material (Admin Only)
export const addStudyMaterial = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // ✅ Ensure Cloudinary URL is saved correctly
    const fileUrl = req.file.path; // Cloudinary storage already handles the upload

    const newStudyMaterial = new StudyMaterial({
      title,
      category,
      fileUrl,
    });

    await newStudyMaterial.save();
    res.status(201).json({ 
      message: "Study Material added successfully!", 
      newStudyMaterial 
    });
  } catch (error) {
    console.error("Error uploading study material:", error);
    res.status(500).json({ error: "Server Error!" });
  }
};

// 📌 Update Study Material (Admin Only)
export const updateStudyMaterial = async (req, res) => {
  try {
    const { title, category } = req.body;
    const { id } = req.params;

    const studyMaterial = await StudyMaterial.findById(id);
    if (!studyMaterial) {
      return res.status(404).json({ error: "Study material not found" });
    }

    // ✅ Delete old file from Cloudinary if a new file is uploaded
    if (req.file) {
      const fileId = studyMaterial.fileUrl.split("/").slice(-2).join("/"); // ✅ More reliable Cloudinary ID extraction
      await cloudinary.uploader.destroy(fileId);
      studyMaterial.fileUrl = req.file.path;
    }

    // ✅ Update fields
    studyMaterial.title = title || studyMaterial.title;
    studyMaterial.category = category || studyMaterial.category;

    await studyMaterial.save();
    res.status(200).json({ message: "Study Material updated successfully!", studyMaterial });
  } catch (error) {
    res.status(500).json({ error: "Failed to update study material" });
  }
};

// 📌 Delete Study Material (Admin Only)
export const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Study material not found" });

    // ✅ Delete file from Cloudinary
    const fileId = material.fileUrl.split("/").slice(-2).join("/"); // ✅ Safer way to extract Cloudinary ID
    await cloudinary.uploader.destroy(fileId);

    await material.deleteOne();
    res.status(200).json({ message: "Study material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete study material" });
  }
};
