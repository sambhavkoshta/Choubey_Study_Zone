import { StudyMaterial } from "../models/StudyMaterial.js";
import cloudinary from "../utils/cloudinary.js";

export const getStudyMaterials = async (req, res) => {
  try {
    const notes = await StudyMaterial.find({ category: "notes" })
    const syllabus = await StudyMaterial.find({ category: "syllabus" });
    res.status(200).json({ notes, syllabus });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch study materials" });
  }
};

export const addStudyMaterial = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category || !req.file) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const fileUrl = req.file.path; 
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


export const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Study material not found" });
    const fileId = material.fileUrl.split("/").slice(-2).join("/"); 
    await cloudinary.uploader.destroy(fileId);
    await material.deleteOne();
    res.status(200).json({ message: "Study material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete study material" });
  }
};
