import mongoose from "mongoose";

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['notes','syllabus'], required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

export const StudyMaterial= mongoose.model("StudyMaterial", StudyMaterialSchema);
