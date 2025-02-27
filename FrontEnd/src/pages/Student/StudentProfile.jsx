import { useState, useEffect } from "react";

const StudentProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/student/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Student Profile</h2>
      {user ? (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || "Not Provided"}</p>
            <p><span className="font-semibold">Enrolled Courses:</span> {user.enrolledCourses?.length || 0}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default StudentProfile;
