import { useState, useEffect } from "react";
import API from "../api"; // API कॉल्स के लिए Import
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CoursePreview = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data.slice(0, 3)); // केवल 3 Courses दिखाओ
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          📚 Popular Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white text-gray-900 p-5 rounded-2xl shadow-xl transform hover:scale-105 transition duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h3 className="text-xl font-bold mt-3">{course.title}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  {course.description.slice(0, 60)}...
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold text-blue-600 text-lg">
                    ₹{course.price}
                  </p>
                  <Link
                    to="/courses"
                    className="text-indigo-600 font-semibold flex items-center hover:text-indigo-800"
                  >
                    View More <FaArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No courses available.</p>
          )}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-100 transition"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
