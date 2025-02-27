import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const GalleryPreview = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await API.get("/gallery");
        if (response.data.images) {
          setImages(response.data.images.slice(0, 3)); // केवल 3 इमेज दिखाओ
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to load images.");
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold">📸 Gallery Highlights</h2>
          <p className="text-lg text-gray-200 mt-2">
            A glimpse of our most memorable moments.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-300">{error}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={img._id}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => openImage(index)}
              >
                <img
                  src={img.url}
                  alt="Gallery"
                  className="w-full h-60 object-cover rounded-xl transform transition duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">🔍 View Image</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/gallery")}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-100 transition-transform transform hover:scale-105"
          >
            View More Gallery
          </button>
        </div>
      </div>

      {/* Large Image Viewer */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button className="absolute top-5 right-5 text-white text-3xl" onClick={closeImage}>
            <FaTimes />
          </button>
          <button className="absolute left-5 text-white text-3xl" onClick={prevImage}>
            <FaArrowLeft />
          </button>
          <img src={images[selectedImage].url} alt="Large View" className="max-w-4xl max-h-[90vh] rounded-lg shadow-xl" />
          <button className="absolute right-5 text-white text-3xl" onClick={nextImage}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryPreview;
