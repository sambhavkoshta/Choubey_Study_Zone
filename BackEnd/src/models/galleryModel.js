import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  originalName: {
    type: String
  },
  size: {
    type: Number
  },
  mimetype: {
    type: String
  },
  metadata: {
    width: Number,
    height: Number,
    format: String,
    bytes: Number
  }
}, { 
  timestamps: true 
});

export default mongoose.model("Gallery", GallerySchema);
