import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import mime from "mime-types"; // ✅ MIME type handling

// ✅ Allowed file formats & max size
const FILE_CONFIG = {
  notes: { formats: ["pdf"], maxSize: 10 * 1024 * 1024 }, // 10MB
  videos: { formats: ["mp4"], maxSize: 100 * 1024 * 1024 }, // 100MB
  syllabus: { formats: ["pdf"], maxSize: 10 * 1024 * 1024 }, // 10MB
  images: { formats: ["jpg", "jpeg", "png"], maxSize: 10 * 1024 * 1024 }, // 10MB
};

// ✅ Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const category = req.body.category || "notes";
    const fileExtension = mime.extension(file.mimetype);

    if (!FILE_CONFIG[category]) {
      throw new Error("Invalid category! Choose from notes, videos, syllabus, images.");
    }

    if (!FILE_CONFIG[category].formats.includes(fileExtension)) {
      throw new Error(`Invalid file format for ${category}! Allowed: ${FILE_CONFIG[category].formats.join(", ")}`);
    }

    return {
      folder: `study-materials/${category}`,
      resource_type: category === "videos" ? "video" : "auto",
      format: fileExtension, // ✅ Force correct format
    };
  },
});

// ✅ File Filter for Validation
const fileFilter = (req, file, cb) => {
  try {
    const category = req.body.category || "notes";
    const fileExtension = mime.extension(file.mimetype);

    if (!FILE_CONFIG[category]) return cb(new Error("Invalid category!"), false);
    if (!FILE_CONFIG[category].formats.includes(fileExtension)) {
      return cb(new Error(`Invalid format! Allowed: ${FILE_CONFIG[category].formats.join(", ")}`), false);
    }

    cb(null, true);
  } catch (error) {
    cb(error, false);
  }
};

// ✅ Multer Upload Middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // ✅ Prevent very large files
});

export default upload;
