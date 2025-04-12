import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Cloudinary पर File Upload Function
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    if (!filePath) throw new Error("File path is required!");

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
    });

    // ✅ Upload के बाद Temp File Delete कर दो
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) throw new Error("File URL is required!");
    const parts = fileUrl.split("/");
    const publicIdWithExtension = parts.slice(-2).join("/"); 
    const publicId = publicIdWithExtension.split(".")[0];

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    throw new Error("Cloudinary delete failed");
  }
};

export default cloudinary;
