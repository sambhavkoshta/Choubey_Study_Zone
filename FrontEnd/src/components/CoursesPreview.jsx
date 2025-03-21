import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBook, FaSpinner } from "react-icons/fa";

const CoursePreview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 md:mb-10">
          <FaBook className="text-2xl sm:text-3xl text-yellow-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
            Popular Courses
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-4xl text-yellow-300" />
          </div>
        ) : error ? (
          <div className="bg-white/20 rounded-lg p-4 text-center max-w-md mx-auto">
            <p className="text-white">{error}</p>
            <button 
              onClick={fetchCourses}
              className="mt-3 bg-yellow-400 text-indigo-900 px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white text-gray-900 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 sm:h-48 object-cover transform hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mt-3 text-gray-800 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <p className="font-bold text-indigo-700 text-base sm:text-lg">
                        ₹{course.price}
                      </p>
                      <Link
                        to={`/courses/${course._id}`}
                        className="text-indigo-600 font-medium flex items-center text-sm hover:text-indigo-800"
                      >
                        View Details <FaArrowRight className="ml-1 text-xs" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-white bg-white/20 py-6 rounded-lg">
                  No courses available at the moment.
                </p>
              )}
            </div>

            <div className="text-center mt-8 sm:mt-10">
              <Link
                to="/courses"
                className="inline-block bg-yellow-400 text-indigo-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md hover:bg-yellow-300 active:bg-yellow-500 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-indigo-700"
              >
                View All Courses
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CoursePreview;