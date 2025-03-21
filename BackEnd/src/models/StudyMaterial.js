import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, enum: ["notes", "videos", "syllabus"], required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const StudyMaterial= mongoose.model("StudyMaterial", studyMaterialSchema);
