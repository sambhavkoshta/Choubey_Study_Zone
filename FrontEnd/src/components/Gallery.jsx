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
      if (!fullscreenImage) return;
      
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
  }, [currentIndex, images, fullscreenImage]);

  // Prevent body scroll when fullscreen image is open
  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [fullscreenImage]);

  return (
    <div className="min-h-screen py-8 sm:py-10 md:py-12 bg-[#F5F5F5] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-12" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E88E5] mb-2 sm:mb-4">📸 Our Stunning Gallery</h1>
          <p className="text-base sm:text-lg text-[#212121] max-w-3xl mx-auto">
            "Experience the beauty of learning through captured moments."
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E88E5]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1565C0] transition"
            >
              Try Again
            </button>
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No images available in the gallery.</p>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={img._id || index}
                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.05 }
                }}
                onClick={() => handleImageClick(img.url, index)}
              >
                <div className="relative pb-[75%]">
                  <img 
                    src={img.url} 
                    alt={img.title || "Gallery image"} 
                    className="absolute inset-0 w-full h-full object-cover rounded-xl" 
                    loading="lazy" 
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-base sm:text-lg font-medium px-4 py-2 rounded-full bg-black bg-opacity-40">
                    🔍 View Image
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {fullscreenImage && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseFullscreen}
          >
            <button
              onClick={showPrevImage}
              className="absolute left-2 sm:left-6 md:left-10 text-white text-xl sm:text-2xl md:text-3xl p-2 sm:p-3 md:p-4 rounded-full bg-black bg-opacity-50 hover:bg-white hover:text-black transition z-20"
              aria-label="Previous image"
            >
              <FaArrowLeft />
            </button>

            <div className="relative w-full max-w-6xl max-h-[80vh] flex items-center justify-center">
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen Image"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              onClick={showNextImage}
              className="absolute right-2 sm:right-6 md:right-10 text-white text-xl sm:text-2xl md:text-3xl p-2 sm:p-3 md:p-4 rounded-full bg-black bg-opacity-50 hover:bg-white hover:text-black transition z-20"
              aria-label="Next image"
            >
              <FaArrowRight />
            </button>

            <button
              onClick={handleCloseFullscreen}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white text-xl sm:text-2xl md:text-3xl p-2 sm:p-3 md:p-4 rounded-full bg-red-600 bg-opacity-70 hover:bg-white hover:text-red-600 transition z-20"
              aria-label="Close fullscreen"
            >
              <FaTimes />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </div>
      <ScrollToTopButton/>
    </div>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-blue-700 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <span className="text-lg">↑</span>
    </button>
  );
};

export default Gallery;