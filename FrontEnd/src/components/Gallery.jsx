import React, { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await API.get("/gallery");
        if (response.data.images) {
          setImages(response.data.images);
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

  const handleImageClick = (src, index) => {
    setFullscreenImage(src);
    setCurrentIndex(index);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    setFullscreenImage(images[nextIndex].url);
    setCurrentIndex(nextIndex);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setFullscreenImage(images[prevIndex].url);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseFullscreen();
      } else if (event.key === "ArrowRight") {
        showNextImage(event);
      } else if (event.key === "ArrowLeft") {
        showPrevImage(event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images]);

  return (
    <div className="bg-gradient-to-b from-[#1A2A6C] via-[#B21F1F] to-[#fdbb2d] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">📸 Our Stunning Gallery</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto italic">"Experience the beauty of learning through captured moments."</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
            {images.map((img, index) => (
              <motion.div
                key={img._id}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleImageClick(img.url, index)}
              >
                <img src={img.url} alt="Gallery" className="w-full h-72 object-cover rounded-xl" loading="lazy" />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">🔍 View Image</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {fullscreenImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-md" onClick={handleCloseFullscreen}>
            <button
              onClick={showPrevImage}
              className="absolute left-10 text-white text-3xl p-4 rounded-full bg-gray-800/70 hover:bg-white hover:text-black transition"
            >
              <FaArrowLeft />
            </button>

            <motion.img
              src={fullscreenImage}
              alt="Fullscreen Image"
              className="max-w-4xl h-auto object-cover rounded-xl shadow-lg border-4 border-gray-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            <button
              onClick={showNextImage}
              className="absolute right-10 text-white text-3xl p-4 rounded-full bg-gray-800/70 hover:bg-white hover:text-black transition"
            >
              <FaArrowRight />
            </button>

            <button
              onClick={handleCloseFullscreen}
              className="absolute top-8 right-8 text-white text-3xl p-4 rounded-full bg-red-600/70 hover:bg-white hover:text-black transition"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
 