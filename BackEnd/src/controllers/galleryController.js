import Gallery from "../models/galleryModel.js";

export const uploadImage = async (req, res) => {
  try {
    const newImage = new Gallery({ image: req.file.path });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
