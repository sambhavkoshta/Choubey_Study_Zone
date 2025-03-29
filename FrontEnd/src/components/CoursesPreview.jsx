import { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const CoursePreview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get("/courses");
      setCourses(res.data.slice(0, 3)); // केवल 3 Courses दिखाओ
      setError(null);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate('/courses');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-6 sm:mb-8 md:mb-10"
        >
          <FaBook className="text-2xl sm:text-3xl text-yellow-300 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
            Popular Courses
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-yellow-300" />
          </div>
        ) : error ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center max-w-md mx-auto shadow-lg"
          >
            <p className="text-white">{error}</p>
            <button 
              onClick={fetchCourses}
              className="mt-4 bg-yellow-400 text-indigo-900 px-5 py-2.5 rounded-md font-medium hover:bg-yellow-300 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
            >
              Try Again
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {courses.length > 0 ? (
                courses.map((course) => (
                  <motion.div
                    key={course._id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="bg-white text-gray-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer"
                    onClick={handleCardClick}
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:h-48 object-cover transform hover:scale-110 transition duration-700 ease-in-out"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mt-3 text-gray-800 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <motion.p 
                        whileHover={{ scale: 1.05 }}
                        className="font-bold text-indigo-700 text-base sm:text-lg"
                      >
                        ₹{course.price}
                      </motion.p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="col-span-full text-center text-white bg-white/20 backdrop-blur-sm py-8 rounded-lg"
                >
                  No courses available at the moment.
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mt-10 sm:mt-12"
            >
              <Link
                to="/courses"
                className="inline-block bg-yellow-400 text-indigo-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md hover:bg-yellow-300 active:bg-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-indigo-700 transform hover:-translate-y-1 active:translate-y-0 hover:shadow-lg"
              >
                View All Courses
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default CoursePreview;