import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const AdminLayout = () => {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Only auto-close sidebar on mobile when first loading or resizing to mobile
      if (mobile && window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else if (!mobile) {
        // Always keep sidebar open on desktop
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Authentication check
  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [admin, navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar / Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 mr-4 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none transition-all duration-200"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <IoMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:block">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              A
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-10rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;