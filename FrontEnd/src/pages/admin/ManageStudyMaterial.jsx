import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaTrash } from "react-icons/fa";

const ManageStudyMaterial = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get("http://localhost:7000/api/study-materials");
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/study-materials/${id}`);
      fetchMaterials(); // Refresh List
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Study Materials</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material._id} className="border">
              <td className="p-2 border">{material.title}</td>
              <td className="p-2 border">{material.fileType}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => window.open(material.fileUrl)}
                  className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
                >
                  <FaDownload /> Download
                </button>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="bg-red-500 text-white p-2 rounded flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudyMaterial;
