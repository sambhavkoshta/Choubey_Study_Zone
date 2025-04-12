import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaTrash, FaFile, FaVideo, FaBookOpen, FaPlus, FaSpinner } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageStudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("notes");
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const adminToken = localStorage.getItem("adminToken");
  useEffect(() => {
    fetchMaterials();
  }, []);
  const fetchMaterials = async () => {
    try {
      const { data } = await axios.get("http://localhost:7000/api/study-materials");
      setMaterials([...data.notes, ...data.syllabus]);
    } catch (error) {
      toast.error("Failed to fetch study materials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this study material?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:7000/api/study-materials/${id}`, {
                headers: { Authorization: `Bearer ${adminToken}` },
              });
              fetchMaterials();
              toast.success("Study material deleted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } catch (error) {
              toast.error("Failed to delete study material", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);   
    try {
      setIsUploading(true);
      await axios.post("http://localhost:7000/api/study-materials", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setFile(null);
      setTitle("");
      setCategory("notes");
      setIsUploadFormOpen(false);
      fetchMaterials();
      toast.success("Study material uploaded successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to upload study material", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsUploading(false);
    }
  };
const handleDownload = (fileUrl, title) => {
   const finalUrl = `${fileUrl}?fl_attachment=${encodeURIComponent(title)}.pdf`;
  window.open(finalUrl, "_blank");
};
  const categoryIcons = {
    notes: <FaFile className="text-blue-500" />,
    videos: <FaVideo className="text-red-500" />,
    syllabus: <FaBookOpen className="text-green-500" />
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Study Materials</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsUploadFormOpen(!isUploadFormOpen)}
          className="bg-blue-500 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaPlus />
        </motion.button>
      </div>
      <AnimatePresence>
        {isUploadFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white shadow-md rounded-lg p-6 mb-6"
          >
            <form onSubmit={handleUpload} className="space-y-4">
              <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full p-2 border rounded" 
                required 
              />
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="notes">Notes</option>
                <option value="syllabus">Syllabus</option>
              </select>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                className="w-full p-2 border rounded" 
                required 
              />
              <button 
                type="submit" 
                disabled={isUploading}
                className={`w-full p-2 rounded text-white transition-colors ${
                  isUploading 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Uploading...
                  </div>
                ) : (
                  "Upload Material"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600 font-semibold">Title</th>
              <th className="p-4 text-left text-gray-600 font-semibold">Category</th>
              <th className="p-4 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  {categoryIcons[material.category]}
                  <span className="font-medium">{material.title}</span>
                </td>
                <td className="p-4 text-gray-600 capitalize">{material.category}</td>
                <td className="p-4 space-x-2">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                    onClick={() => handleDownload(material.fileUrl, material.title)}
                  >
                    <FaDownload className="mr-2" /> Download
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center"
                    onClick={() => handleDelete(material._id)}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ManageStudyMaterial;