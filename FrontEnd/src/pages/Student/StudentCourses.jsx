import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation Hook
import axios from "axios";

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ✅ React Router Navigation

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem("userToken");

                // ✅ Step 1: Fetch Profile API (User ID)
                const profileResponse = await axios.get("http://localhost:7000/api/student/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userId = profileResponse.data?._id;
                if (!userId) {
                    throw new Error("User ID not found");
                }

                // ✅ Step 2: Fetch Enrolled Courses
                const response = await axios.get(`http://localhost:7000/api/student/enrolled-courses/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("✅ Enrolled Courses Data:", response.data);

                if (response.data.enrolledCourses?.length > 0) {
                    setCourses(response.data.enrolledCourses);
                } else {
                    setCourses([]);
                }
            } catch (error) {
                console.error("❌ Error fetching enrolled courses:", error);
                setError("Failed to load courses");
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700">Your Enrolled Courses</h2>

            {loading && <p className="text-center text-gray-500 mt-4">Loading courses...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {!loading && courses.length === 0 && <p className="text-center text-gray-600 mt-4">No courses found.</p>}

            {courses.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                                <p className="text-gray-600 mt-2">{course.description}</p>
                                <p className="text-blue-700 font-bold text-lg mt-2">₹{course.price}</p>

                                {/* <button
                                    onClick={() => navigate(`/dashboard/courses/${course._id}`)} // ✅ Navigate to CourseDetails
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                >
                                    View Course
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentCourses;
