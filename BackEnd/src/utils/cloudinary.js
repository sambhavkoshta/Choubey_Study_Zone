// import {v2 as cloudinary} from "cloudinary";
// import fs from "fs";

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLODINARY_API_KEY, 
//     api_secret: process.env.CLODINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
// });

// const uploadOnCloudinary = async (localFilePath)=> {
//     try {
//         if(!localFilePath) return null;
//         const response= await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         console.log("file is uploaded on cloudinary",response.url);
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }

// }

// export {uploadOnCloudinary}


// cloudinary.v2.uploader.upload()


import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Function
export const uploadToCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, { folder });
    fs.unlinkSync(filePath); // Delete temp file after upload
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

// Delete Function
export const deleteFromCloudinary = async (fileUrl) => {
  try {
    const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract public_id from URL
    await cloudinary.v2.uploader.destroy(`study_materials/${publicId}`);
  } catch (error) {
    throw new Error("Cloudinary delete failed");
  }
};

export default cloudinary;



