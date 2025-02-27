import { useEffect, useState } from "react";
import { getProfile } from "../../api";

const Profile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const data = await getProfile(token);
      if (data) setStudent(data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>
      {student ? (
        <div className="bg-white shadow-md rounded p-4">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
