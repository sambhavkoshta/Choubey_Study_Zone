import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Menu, X, Home, BookOpen, Users, Image, 
  FileText, MessageSquare, Phone, UserCheck, 
  LogOut
} from "lucide-react";

const AdminSidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "Manage Courses", path: "/admin/courses", icon: <BookOpen size={20} /> },
    { name: "Manage Students", path: "/admin/students", icon: <Users size={20} /> },
    { name: "Manage Gallery", path: "/admin/gallery", icon: <Image size={20} /> },
    { name: "Manage Study Materials", path: "/admin/materials", icon: <FileText size={20} /> },
    { name: "Manage Feedback", path: "/admin/feedback", icon: <MessageSquare size={20} /> },
    { name: "Manage Contact", path: "/admin/contact", icon: <Phone size={20} /> },
    { name: "Manage Faculty", path: "/admin/faculty", icon: <UserCheck size={20} /> },
  ];

  // For mobile: hidden when closed, full width when open
  // For desktop: narrow width when closed, normal width when open
  const sidebarClasses = isMobile
    ? `fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out z-50
       bg-blue-700 text-white shadow-xl flex flex-col
       ${isOpen ? "translate-x-0 w-64" : "-translate-x-full"}`
    : `relative h-screen transition-all duration-300 ease-in-out z-10
       bg-blue-700 text-white shadow-xl flex flex-col
       ${isOpen ? "w-64" : "w-20"}`;

  return (
    <div className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-600/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <span className="text-blue-700 font-bold text-xl">A</span>
          </div>
          {(isOpen || !isMobile) && (
            <h1 className="text-lg font-bold text-white">
              {isOpen ? "Admin Portal" : ""}
            </h1>
          )}
        </div>
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-blue-600 transition-all duration-300 text-white"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 
                  ${isActive 
                    ? "bg-white text-blue-700 font-medium" 
                    : "hover:bg-blue-600 text-white"}`}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <div className={`flex items-center justify-center ${isActive ? "text-blue-700" : ""}`}>
                    {item.icon}
                  </div>
                  {isOpen && (
                    <span className="text-base font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-blue-600/50 mt-auto">
        <button
          onClick={() => console.log("Logout clicked")}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg 
          text-white hover:bg-red-600 transition-all duration-200"
        >
          <LogOut size={20} />
          {isOpen && <span className="text-base font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;