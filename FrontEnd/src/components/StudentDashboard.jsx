// import { Link, Outlet } from "react-router-dom";
// import { useState } from "react";
// import { FaBook, FaUser, FaCommentDots, FaSignOutAlt, FaChalkboardTeacher } from "react-icons/fa";

// const StudentDashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? "w-64" : "w-20"
//         } bg-blue-600 text-white min-h-screen transition-all duration-300 p-5 relative`}
//       >
//         <button
//           className="absolute top-4 right-4 text-white text-xl focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "⬅" : "➡"}
//         </button>

//         <div className="mt-10 space-y-6">
//           <Link to="/dashboard" className="flex items-center space-x-2 p-3 hover:bg-blue-700 rounded-lg">
//             <FaChalkboardTeacher />
//             {isOpen && <span>Dashboard</span>}
//           </Link>
//           <Link to="/dashboard/courses" className="flex items-center space-x-2 p-3 hover:bg-blue-700 rounded-lg">
//             <FaBook />
//             {isOpen && <span>My Courses</span>}
//           </Link>
//           <Link to="/dashboard/profile" className="flex items-center space-x-2 p-3 hover:bg-blue-700 rounded-lg">
//             <FaUser />
//             {isOpen && <span>Profile</span>}
//           </Link>
//           <Link to="/dashboard/feedback" className="flex items-center space-x-2 p-3 hover:bg-blue-700 rounded-lg">
//             <FaCommentDots />
//             {isOpen && <span>Feedback</span>}
//           </Link>
//           <button className="flex items-center space-x-2 p-3 hover:bg-red-600 rounded-lg w-full">
//             <FaSignOutAlt />
//             {isOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Student Dashboard</h2>
        <nav className="mt-6 space-y-2">
          <button
            className={`w-full text-left p-2 rounded-md ${activeTab === "profile" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
          <button
            className={`w-full text-left p-2 rounded-md ${activeTab === "my-courses" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("my-courses")}
          >
            📚 My Courses
          </button>
          <button
            className={`w-full text-left p-2 rounded-md ${activeTab === "study-materials" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("study-materials")}
          >
            📄 Study Materials
          </button>
          <button
            className={`w-full text-left p-2 rounded-md ${activeTab === "feedback" ? "bg-blue-700" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            ✍️ Feedback
          </button>
          <button
            className="w-full text-left p-2 rounded-md bg-red-600 hover:bg-red-700"
            onClick={() => navigate("/login")}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "my-courses" && <h2 className="text-xl font-semibold">📚 My Courses</h2>}
        {activeTab === "profile" && <h2 className="text-xl font-semibold">👤 Profile</h2>}
        {activeTab === "study-materials" && <h2 className="text-xl font-semibold">📄 Study Materials</h2>}
        {activeTab === "feedback" && <h2 className="text-xl font-semibold">✍️ Feedback</h2>}
      </main>
    </div>
  );
};

export default StudentDashboard;
