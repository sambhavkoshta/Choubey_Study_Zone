import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../Student/StudentSidebar";
import { Menu, X, Bell, User } from "lucide-react";

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSidebar onItemClick={() => setSidebarOpen(false)} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className={`bg-white px-4 py-3 shadow-sm transition-shadow duration-200 ${
          scrolled ? "shadow-md" : ""
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-2 rounded-full p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm">
                  <span className="font-bold">SP</span>
                </div>
                <span className="text-lg font-bold text-gray-800">Student Portal</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;