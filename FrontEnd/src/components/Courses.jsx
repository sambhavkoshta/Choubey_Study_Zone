import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BookOpen, IndianRupee } from 'lucide-react';
import EnrollmentForm from './EnrollmentForm';
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:7000/api/courses');
        setCourses(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
        const res = await axios.get('http://localhost:7000/api/student/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsLoggedIn(false);
        localStorage.removeItem("userToken");
      }
    };
    fetchCourses();
    fetchUser();
  }, []);
  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-8 sm:py-10 md:py-12 bg-[#F5F5F5] px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 sm:mb-4">
            Our Courses
          </h1>
          <p className="text-base sm:text-lg text-gray-800 max-w-3xl mx-auto">
            Choose from our selection of comprehensive courses designed to help you succeed
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Try Again
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-700 text-lg">No courses available at the moment.</p>
            <p className="text-gray-600 mt-2">Please check back later for new course offerings.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {courses.map((course) => (
              <motion.div 
                key={course._id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  {course.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>               
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary flex-shrink-0" /> 
                    <span className="line-clamp-1">{course.title}</span>
                  </h3>                 
                  <p className="text-gray-700 mb-4 text-sm sm:text-base line-clamp-3 flex-grow">
                    {course.description}
                  </p>                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-base sm:text-lg font-semibold text-[#FFC107] flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" /> {course.price}
                      </span>                      
                      {course.duration && (
                        <span className="text-sm text-gray-600">
                          {course.duration}
                        </span>
                      )}
                    </div>                    
                    <motion.button
                      onClick={() => handleEnrollClick(course)}
                      className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 text-sm sm:text-base font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {selectedCourse && (
        <EnrollmentForm 
          course={selectedCourse}  
          user={user}  
          onClose={() => setSelectedCourse(null)}  
          isLoggedIn={isLoggedIn}
        />
      )}
      <ScrollToTopButton></ScrollToTopButton>
    </motion.div>
  );
};
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
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
export default Courses;