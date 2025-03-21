import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetails = () => {
  const { courseId } = useParams(); // ✅ Get Course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         const token = localStorage.getItem("userToken");

//         console.log("Fetching Course Details for ID:", courseId); // ✅ Debug Log

//         const response = await axios.get(
//           `http://localhost:7000/api/student/courses/${courseId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         console.log("✅ Course Details Data:", response.data); // ✅ Debug Log
//         setCourse(response.data);
//       } catch (err) {
//         console.error("❌ Error fetching course details:", err);
//         setError("Failed to load course details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (courseId) {
//       fetchCourseDetails();
//     } else {
//       setError("Invalid Course ID");
//       setLoading(false);
//     }
    //   }, [courseId]);
    
    useEffect(() => {
    const fetchCourseDetails = async () => {
        try {
            const token = localStorage.getItem("userToken");

            console.log("Fetching Course ID from URL:", courseId); // ✅ Debug Log
            console.log(`API URL: http://localhost:7000/api/courses/${courseId}`);

            const response = await axios.get(
                `http://localhost:7000/api/courses/${courseId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("✅ Course Details Data:", response.data);
            setCourse(response.data);
        } catch (err) {
            console.error("❌ Error fetching course details:", err);
            setError("Failed to load course details");
        } finally {
            setLoading(false);
        }
    };

    if (courseId) {
        fetchCourseDetails();
    } else {
        setError("Invalid Course ID");
        setLoading(false);
    }
}, [courseId]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {course ? (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg" />
          <h2 className="text-2xl font-bold mt-4">{course.title}</h2>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <p className="text-lg font-bold text-green-700 mt-4">₹{course.price}</p>
        </div>
      ) : (
        <p>No course details available.</p>
      )}
    </div>
  );
};

export default CourseDetails;
