import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api'; // Import Axios
import EnrollmentForm from './EnrollmentForm'; // Enrollment Form Component

const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [selectedCourse, setSelectedCourse] = useState(null); // Selected Course
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get('/courses'); 
        setCourses(response.data);
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnrollClick = (course) => {
    if (!isLoggedIn) {
      alert("Please login or register to enroll in a course.");
      navigate('/login');
      return;
    }
    setSelectedCourse(course); // Set selected course for enrollment
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our selection of comprehensive courses designed to help you succeed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <motion.div key={course._id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                    <span className="text-lg font-semibold text-blue-600">{course.price}</span>
                  </div>
                  <button
                    onClick={() => handleEnrollClick(course)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    {isLoggedIn ? "Enroll Now" : "Login to Enroll"}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No courses available.</p>
          )}
        </div>
      </div>

      {/* Enrollment Form Modal */}
      {selectedCourse && <EnrollmentForm course={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  );
};

export default Courses;
