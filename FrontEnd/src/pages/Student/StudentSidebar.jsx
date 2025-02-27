import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBook, FiMessageSquare } from "react-icons/fi";

const StudentSidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-screen p-4">
      <h2 className="text-xl font-semibold text-center mb-6">📚 Student Panel</h2>
      <nav>
        <NavLink
          to="/dashboard"
          className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-blue-700"
        >
          <FiHome /> <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-blue-700"
        >
          <FiUser /> <span>My Profile</span>
        </NavLink>
        <NavLink
          to="/dashboard/courses"
          className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-blue-700"
        >
          <FiBook /> <span>My Courses</span>
        </NavLink>
        <NavLink
          to="/dashboard/feedback"
          className="flex items-center space-x-3 py-3 px-4 rounded-md hover:bg-blue-700"
        >
          <FiMessageSquare /> <span>Feedback</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default StudentSidebar;
