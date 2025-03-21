import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../Student/StudentSidebar";
import { Menu, X } from "lucide-react";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header with Hamburger Menu */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-blue-700">Student Portal</h1>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring focus:ring-blue-200"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Mobile (overlay) vs Desktop (side by side) */}
      <div className={`
        fixed md:static inset-0 z-20 
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'bg-black bg-opacity-30 md:bg-opacity-0' : ''}
      `}>
        <div 
          className="w-64 h-full md:h-screen bg-white shadow-lg md:shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <StudentSidebar onItemClick={() => setSidebarOpen(false)} />
        </div>
        {/* Close sidebar when clicking outside on mobile */}
        <div 
          className="md:hidden absolute inset-0 -z-10" 
          onClick={toggleSidebar}
        ></div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-0 transition-all duration-300">
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;