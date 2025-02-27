import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import API from "../../api";

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [formData, setFormData] = useState({ name: "", subject: "", experience: "", image: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchFaculty();
  }, [searchQuery, currentPage]);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/faculty/all?query=${searchQuery}`);
      setFaculty(response.data);
    } catch (error) {
      toast.error("Error fetching faculty");
    }
    setLoading(false);
  };

  const handleDrop = (acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, accept: "image/*" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("experience", formData.experience);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      if (selectedFaculty) {
        await API.put(`/faculty/${selectedFaculty._id}`, formDataObj);
        toast.success("Faculty Updated Successfully");
      } else {
        await API.post("/faculty/add", formDataObj);
        toast.success("Faculty Added Successfully");
      }
      fetchFaculty();
      setShowForm(false);
      setSelectedFaculty(null);
      setFormData({ name: "", subject: "", experience: "", image: null });
    } catch (error) {
      toast.error("Error saving faculty");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/faculty/${selectedFaculty._id}`);
      toast.success("Faculty Deleted Successfully");
      fetchFaculty();
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Error deleting faculty");
    }
  };

  const totalPages = Math.ceil(faculty.length / itemsPerPage);
  const paginatedFaculty = faculty.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Faculty
        </button>
        <input
          type="text"
          placeholder="Search Faculty"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedFaculty.map((fac) => (
          <div key={fac._id} className="bg-white p-4 rounded shadow-md">
            <img src={fac.image} alt={fac.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-bold">{fac.name}</h3>
            <p>Subject: {fac.subject}</p>
            <p>Experience: {fac.experience} years</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => { setSelectedFaculty(fac); setShowForm(true); }} className="bg-yellow-500 text-white px-4 py-1 rounded"><FaEdit /></button>
              <button onClick={() => { setSelectedFaculty(fac); setShowDeleteModal(true); }} className="bg-red-500 text-white px-4 py-1 rounded"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-300 rounded">Prev</button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-300 rounded">Next</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{selectedFaculty ? "Edit Faculty" : "Add Faculty"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded mb-2" required />
              <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full p-2 border rounded mb-2" required />
              <input type="number" placeholder="Experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full p-2 border rounded mb-2" required />
              <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer mb-2">
                <input {...getInputProps()} />
                {formData.image ? <p>{formData.image.name}</p> : <p>Drag & drop an image, or click to select</p>}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">{loading ? "Processing..." : selectedFaculty ? "Update" : "Add"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;