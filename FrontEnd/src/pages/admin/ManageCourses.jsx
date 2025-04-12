import { useState, useEffect } from "react";
import API from "../../api";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const itemsPerPage = 8;
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
      setLoading(true);
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
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
      setLoading(true);
      await API.delete(`/courses/${selectedCourse._id}`);
      toast.success("Course deleted successfully!");
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
      setLoading(false);
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
    <div className="w-full">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Courses</h2>
        <p className="text-sm text-gray-600">Add, edit or remove course offerings</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium"
        >
          <FaPlus size={14} /> <span>Add New Course</span>
        </button>        
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch size={14} />
          </div>
        </div>
      </div>
      {loading && !showForm && !showDeleteModal && (
        <div className="w-full flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">
            All Courses {filteredCourses.length > 0 && `(${filteredCourses.length})`}
          </h3>
        </div>        
        {paginatedCourses.length > 0 ? (
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedCourses.map((course) => (
                <div key={course._id} className="flex flex-col border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow">{course.description}</p>
                    <p className="font-bold text-blue-600 text-lg">₹{course.price}</p>
                    <div className="flex justify-end space-x-2 mt-3">
                      <button 
                        onClick={() => handleEdit(course)} 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit course"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => confirmDelete(course)} 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete course"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              {searchTerm ? "No courses match your search criteria." : "No courses available."}
            </p>
          </div>
        )}
        {filteredCourses.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center items-center bg-white rounded-lg">
              <div className="flex items-center">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>                
                <div className="flex">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageToShow;
                    if (totalPages <= 5) {
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageToShow = totalPages - 4 + i;
                    } else {
                      pageToShow = currentPage - 2 + i;
                    }                    
                    return (
                      <button
                        key={pageToShow}
                        onClick={() => setCurrentPage(pageToShow)}
                        className={`w-10 h-10 flex items-center justify-center border-t border-b ${
                          i === 0 && currentPage > 3 && totalPages > 5 ? "border-l" : ""
                        } ${
                          i === 4 && currentPage < totalPages - 2 && totalPages > 5 ? "border-r" : ""
                        } ${
                          currentPage === pageToShow
                            ? "bg-blue-600 text-white border-blue-600 font-bold"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        } ${
                          pageToShow === 1 && currentPage > 3 && totalPages > 5 ? "rounded-l-md" : ""
                        } ${
                          pageToShow === totalPages && currentPage < totalPages - 2 && totalPages > 5 ? "rounded-r-md" : ""
                        } transition-all`}
                      >
                        {pageToShow}
                      </button>
                    );
                  })}
                </div>                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center"
                >
                  Next
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                {editingCourse ? "Edit Course" : "Add New Course"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter course title" 
                  />
                </div>                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    rows="3"
                    placeholder="Enter course description"
                  ></textarea>
                </div>                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    value={formData.price} 
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                    required 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Enter price in ₹" 
                  />
                </div>                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
                  <input 
                    key={fileInputKey} 
                    type="file" 
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  {formData.previewImage && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">Current image:</p>
                      <img 
                        src={formData.previewImage} 
                        alt="Preview" 
                        className="h-20 w-auto object-cover rounded-md" 
                      />
                    </div>
                  )}
                </div>
              </div>             
              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => { setShowForm(false); resetForm(); }} 
                  className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex justify-center items-center" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    editingCourse ? "Update Course" : "Add Course"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Confirm Delete</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                Are you sure you want to delete <span className="font-semibold">"{selectedCourse.title}"</span>? This action cannot be undone.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Processing...
                  </>
                ) : (
                  "Delete Course"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageCourses;