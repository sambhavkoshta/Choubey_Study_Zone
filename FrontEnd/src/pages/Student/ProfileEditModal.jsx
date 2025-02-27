import { useState } from "react";

const ProfileEditModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:7000/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      setStudent(result.updatedStudent);
      setIsEditing(false);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
