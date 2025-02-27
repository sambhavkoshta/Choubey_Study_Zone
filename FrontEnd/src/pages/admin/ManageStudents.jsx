import { useEffect, useState } from "react";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://localhost:7000/api/admin/students", {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    const data = await response.json();
    setStudents(data);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:7000/api/admin/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({ name, email, phone, course }),
    });
    fetchStudents();
    setName("");
    setEmail("");
    setPhone("");
    setCourse("");
  };

  const handleDeleteStudent = async (id) => {
    await fetch(`http://localhost:7000/api/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    fetchStudents();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>

      <form onSubmit={handleAddStudent} className="mb-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 w-full mb-2" required />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} className="border p-2 w-full mb-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Student</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student._id} className="border p-3 mb-2 flex justify-between">
            <span>{student.name} - {student.course}</span>
            <button onClick={() => handleDeleteStudent(student._id)} className="bg-red-500 text-white px-3 py-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;
