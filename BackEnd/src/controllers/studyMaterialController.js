import StudyMaterial from "../models/StudyMaterial.js";

// ✅ Upload Study Material
export const uploadStudyMaterial = async (req, res) => {
  try {
    const { title, courseId } = req.body;
    const fileUrl = req.file.path;

    const material = new StudyMaterial({ title, courseId, fileUrl });
    await material.save();

    res.status(201).json({ message: "Study material uploaded successfully", material });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload study material", error });
  }
};

// ✅ Get Study Materials by Course
export const getStudyMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await StudyMaterial.find({ courseId });

    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch study materials", error });
  }
};

// ✅ Delete Study Material
export const deleteStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await StudyMaterial.findByIdAndDelete(id);

    res.json({ message: "Study material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete study material", error });
  }
};
