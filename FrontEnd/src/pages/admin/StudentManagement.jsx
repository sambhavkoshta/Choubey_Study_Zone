import { useState, useEffect } from "react";
import { FaUserGraduate, FaExclamationTriangle,FaEdit } from "react-icons/fa";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const token = localStorage.getItem("adminToken");
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/admin/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch students.");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/admin/students/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete student.");
      setStudents(students.filter((student) => student._id !== deleteId));
      toast.success("Student deleted successfully!");
    } catch (err) {
      toast.error("Error deleting student: " + err.message);
    } finally {
      setDeleteModal(false);
    }
  };
  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
    });
    setShowModal(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/admin/students/${editingStudent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update student.");
      setStudents(students.map((stu) => (stu._id === editingStudent._id ? { ...stu, ...formData } : stu)));
      toast.success("Student updated successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error("Error updating student: " + err.message);
    }
  };
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  if (loading) return <p className="text-center text-gray-600">Loading students...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (students.length === 0) return <p className="text-center text-gray-500">No students found.</p>;
  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Student Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student._id} className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition relative">
            <div className="flex items-center space-x-3 mb-3">
              <FaUserGraduate className="text-gray-700 text-3xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                {student.firstname} {student.lastname}
              </h3>
            </div>
            <p className="text-sm text-gray-600">📧 {student.email}</p>
            <p className="text-sm text-gray-600 font-semibold mt-2">📚 Enrolled Courses:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
                student.enrolledCourses.map((course) => (
                  <span key={course._id} className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-md">
                    {course.title}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">No courses enrolled</span>
              )}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => openEditModal(student)} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition flex items-center">
                <FiEdit className="mr-2" /> Edit
              </button>
              <button onClick={() => confirmDelete(student._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition flex items-center">
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(students.length / studentsPerPage))].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform scale-105 transition-all">
            <h3 className="text-xl font-bold text-gray-800 text-center">Edit Student</h3>
            <div className="mt-4 space-y-3">
              <input type="text" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" placeholder="First Name" />
              <input type="text" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" placeholder="Last Name" />
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" placeholder="Email" />
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition">
                Cancel
              </button>
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform scale-105 transition-all">
            <div className="flex justify-center">
              <FaExclamationTriangle className="text-red-500 text-6xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mt-4">Are you sure?</h3>
            <p className="text-gray-600 text-center mt-2">
              Do you really want to delete this student? This action cannot be undone.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <button onClick={() => setDeleteModal(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition">
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StudentManagement;
