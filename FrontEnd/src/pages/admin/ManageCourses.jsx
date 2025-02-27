import { useState, useEffect } from "react";
import API from "../../api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const itemsPerPage = 4;

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    previewImage: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      console.log(res.data)
      setCourses(res.data);
      
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.image) data.append("image", formData.image);
  
    try {
      if (editingCourse) {
        await API.put(`/courses/${editingCourse._id}`, data);
        toast.success("Course updated successfully!");
      } else {
        await API.post("/courses", data);
        toast.success("Course added successfully!");
      }
      setShowForm(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course!");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      image: null,
      previewImage: course.image,
    });
  };
  
  const confirmDelete = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };
  
  const handleDelete = async () => {
    try {
      await API.delete(`/courses/${selectedCourse._id}`);
      toast.success("Course deleted successfully!");
      fetchCourses();

      const remainingCourses = courses.filter(c => c._id !== selectedCourse._id);
      setCourses(remainingCourses);
      if (remainingCourses.length % itemsPerPage === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course!");
    } finally {
      setShowDeleteModal(false);
    }
  };
  
  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", image: null, previewImage: "" });
    setEditingCourse(null);
    setFileInputKey(Date.now());
  };
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  return (
    <div className="max-w-screen-lg mx-auto p-6 overflow-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Courses</h2>
      <button
        onClick={() => setShowForm(true)}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
      >
        <FaPlus /> <span>Add Course</span>
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h3 className="text-xl font-bold mb-4">{editingCourse ? "Edit Course" : "Add Course"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Course Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full p-3 border border-gray-300 rounded-md mb-4 bg-white shadow-sm" />
              <textarea placeholder="Course Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="w-full p-3 border border-gray-300 rounded-md mb-4 bg-white shadow-sm"></textarea>
              <input type="number" placeholder="Price (₹)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="w-full p-3 border border-gray-300 rounded-md mb-4 bg-white shadow-sm" />
              <input key={fileInputKey} type="file" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full p-3 border border-gray-300 rounded-md mb-4 bg-white shadow-sm" />
              <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold" disabled={loading}>
                {loading ? "Processing..." : editingCourse ? "Update Course" : "Add Course"}
              </button>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="w-full mt-2 bg-gray-400 text-white p-3 rounded-md hover:bg-gray-500 font-semibold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-lg p-6 w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete "{selectedCourse.title}"?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 font-semibold">
                Yes
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 font-semibold">
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Courses</h3>
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 bg-white shadow-sm"
        />
        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedCourses.map((course) => (
              <div key={course._id} className="p-1 border rounded-lg shadow relative bg-white">
                <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md mb-2" />
                <h4 className="text-lg font-semibold">{course.title}</h4>
                <p className="text-gray-600">{course.description}</p>
                <p className="font-bold text-blue-600">₹{course.price}</p>
                <div className="flex space-x-4 mt-2">
                  <button onClick={() => handleEdit(course)} className="text-blue-600 text-xl font-semibold">
                    <FaEdit />
                  </button>
                  <button onClick={() => confirmDelete(course)} className="text-red-600 text-xl font-semibold">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}  
          </div>
        ) : (
          <p className="text-gray-600">No courses available.</p>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 font-semibold">
          Previous Page
        </button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 font-semibold">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ManageCourses;
