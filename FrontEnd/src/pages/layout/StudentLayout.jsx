// src/pages/layout/StudentLayout.jsx
import { Outlet } from "react-router-dom";
import StudentSidebar from "../Student/StudentSidebar";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
