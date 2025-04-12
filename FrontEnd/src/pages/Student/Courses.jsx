import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      try {
        console.log("Fetching courses for:", user._id); 
        const response = await axios.get(`http://localhost:7000/api/student/my-courses/${user._id}`);
        console.log("API Response:", response.data);
        setCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📚 My Enrolled Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-600">😔 No enrolled courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course._id} className="border p-3 mb-2 rounded shadow">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
              <p className="text-blue-600 font-semibold">₹{course.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
