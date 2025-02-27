import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 min-h-screen">
      <ul className="space-y-2">
        <li>
          <Link to="/admin" className="block p-2 hover:bg-gray-700">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/courses" className="block p-2 hover:bg-gray-700">Manage Courses</Link>
        </li>
        <li>
          <Link to="/admin/students" className="block p-2 hover:bg-gray-700">Manage Students</Link>
        </li>
        <li>
          <Link to="/admin/gallery" className="block p-2 hover:bg-gray-700">Manage Gallery</Link>
        </li>
        <li>
          <Link to="/admin/faculty" className="block p-2 hover:bg-gray-700">Manage Faculty</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
