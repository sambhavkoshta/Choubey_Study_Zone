import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";
import Gallery from "../models/galleryModel.js";

const router = express.Router();

// Multer सेटअप: हम memoryStorage का उपयोग करेंगे
const upload = multer({ storage: multer.memoryStorage() });

// 3.1: Image Upload API
// एक बार में अधिकतम 5 इमेज अपलोड हो सकती हैं (Frontend से maxFiles सेट करेंगे)
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No image files provided" });
    }

    const uploadedImages = [];
    for (const file of req.files) {
      // Cloudinary में अपलोड करने के लिए streamifier का उपयोग करें
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      const newImage = new Gallery({ url: result.secure_url });
      await newImage.save();
      uploadedImages.push(newImage);
    }
    res.status(201).json({ message: "Images uploaded successfully", images: uploadedImages });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload images" });
  }
});

// 3.2: Get All Images API
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// 3.3: Delete Image API
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    
    // Cloudinary URL से public_id निकालें। मान लीजिए URL में /gallery/ के बाद public_id आता है।
    const parts = image.url.split("/gallery/");
    if (parts.length < 2) {
      return res.status(500).json({ error: "Invalid image URL" });
    }
    const filename = parts[1]; // {public_id}.{ext}\n"
    const publicId = filename.split(".")[0];
    
    await cloudinary.uploader.destroy(`gallery/${publicId}`);
    await image.deleteOne();
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
