import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
export default StudyMaterial;
