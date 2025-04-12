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
          setImages(response.data.images.slice(0, 3)); 
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
      } else if (event.key === "ArrowRight" && selectedImage !== null) {
        nextImage();
      } else if (event.key === "ArrowLeft" && selectedImage !== null) {
        prevImage();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);
  const openImage = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };
  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">📸 Gallery Highlights</h2>
          <p className="text-base md:text-lg text-gray-200 mt-2">
            A glimpse of our most memorable moments.
          </p>
        </motion.div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-3 rounded text-center mx-auto max-w-lg">
            <p>{error}</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={img._id}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => openImage(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="aspect-w-16 aspect-h-9 sm:aspect-w-4 sm:aspect-h-3">
                  <img
                    src={img.url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                  <p className="text-white text-lg font-semibold mb-2">🔍 View Image</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        <div className="text-center mt-8 md:mt-10">
          <button
            onClick={() => navigate("/gallery")}
            className="bg-white text-indigo-600 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg shadow-md hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            View More Gallery
          </button>
        </div>
      </div>
      {selectedImage !== null && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={closeImage}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 md:top-5 md:right-5 text-white text-2xl md:text-3xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 focus:outline-none transition-all duration-300 z-10" 
              onClick={closeImage}
              aria-label="Close image"
            >
              <FaTimes />
            </button>
            
            <button 
              className="absolute left-2 md:left-5 text-white text-xl md:text-3xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 focus:outline-none transition-all duration-300 z-10" 
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FaArrowLeft />
            </button>
            
            <motion.img 
              src={images[selectedImage].url} 
              alt={`Gallery image ${selectedImage + 1}`} 
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={selectedImage}
            />           
            <button 
              className="absolute right-2 md:right-5 text-white text-xl md:text-3xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 focus:outline-none transition-all duration-300 z-10" 
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaArrowRight />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
export default GalleryPreview;