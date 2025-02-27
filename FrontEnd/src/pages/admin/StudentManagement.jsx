import { useState, useEffect } from "react";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", examCleared: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/students");
    setStudents(response.data.students);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/students", form);
    fetchStudents();
    setForm({ name: "", examCleared: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Manage Students</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          placeholder="Student Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="border p-2 w-full mb-2"
        />
        <input 
          type="text" 
          placeholder="Exam Cleared" 
          value={form.examCleared} 
          onChange={(e) => setForm({ ...form, examCleared: e.target.value })} 
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Student</button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Exam Cleared</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.examCleared}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(student._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
    