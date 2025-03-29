import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import mime from "mime-types"; // ✅ MIME type handling

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
    console.log("📌 File Upload Requested:", file.originalname, "Category:", req.body.category);
    const category = req.body.category || "notes";
    const fileExtension = mime.extension(file.mimetype);

    console.log("📌 Detected File Extension:", fileExtension);

    if (!FILE_CONFIG[category]) {
      console.error("❌ Invalid category:", category);
      throw new Error("Invalid category! Choose from notes, videos, syllabus, images.");
    }

    if (!FILE_CONFIG[category].formats.includes(fileExtension)) {
      console.error("❌ Invalid file format:", fileExtension);
      throw new Error(`Invalid file format for ${category}! Allowed: ${FILE_CONFIG[category].formats.join(", ")}`);
    }

    console.log("✅ Uploading to Cloudinary...");
    return {
      folder: `study-materials/${category}`,
      resource_type: category === "videos" ? "video" : "auto",
      format: fileExtension,
    };
  },
});

// ✅ Multer Upload Middleware
const upload = multer({ storage });

export default upload;
