import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Gallery", GallerySchema);
