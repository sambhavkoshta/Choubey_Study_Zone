import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, BookOpen, Users, Image, FileText, 
  MessageSquare, Phone, UserCheck, LogOut, 
  ChevronRight, Settings
} from "lucide-react";
import API from "../api";

const AdminSidebar = ({ onItemClick }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/admin", 
      icon: <Home size={18} />,
      exact: true 
    },
    { 
      title: "Student Management", 
      isSection: true,
      icon: <Users size={18} />,
      items: [
        { 
          title: "All Students", 
          path: "/admin/students", 
          icon: <Users size={16} /> 
        },
        { 
          title: "Student Feedback", 
          path: "/admin/feedback", 
          icon: <MessageSquare size={16} /> 
        }
      ]
    },
    { 
      title: "Course Management", 
      isSection: true,
      icon: <BookOpen size={18} />,
      items: [
        { 
          title: "All Courses", 
          path: "/admin/courses", 
          icon: <BookOpen size={16} /> 
        },
        { 
          title: "Study Materials", 
          path: "/admin/materials", 
          icon: <FileText size={16} /> 
        }
      ]
    },
    { 
      title: "Content", 
      isSection: true,
      icon: <Image size={18} />,
      items: [
        { 
          title: "Gallery", 
          path: "/admin/gallery", 
          icon: <Image size={16} /> 
        },
        { 
          title: "Contact Inquiries", 
          path: "/admin/contact", 
          icon: <Phone size={16} /> 
        }
      ]
    }
  ];

  // Fetch admin data from backend
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          // If no token exists, redirect to login
          navigate('/admin/login');
          return;
        }

        const response = await API.get('/admin/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setAdminData(response.data);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        
        // Handle authentication errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Clear invalid token and redirect to login
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  // Auto-expand section based on current path
  useEffect(() => {
    const newExpandedSections = { ...expandedSections };
    
    menuItems.forEach(item => {
      if (item.isSection && item.items) {
        const shouldExpand = item.items.some(subItem => 
          location.pathname === subItem.path || 
          location.pathname.startsWith(subItem.path + '/')
        );
        
        if (shouldExpand) {
          newExpandedSections[item.title] = true;
        }
      }
    });
    
    setExpandedSections(newExpandedSections);
  }, [location.pathname]);

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Call logout API endpoint
      await API.post('/admin/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Clean up local storage
      localStorage.removeItem('adminToken');
      
      // Redirect to login page
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if the API call fails, we should still clear local storage and redirect
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const renderNavItem = (item) => {
    if (item.isSection) {
      const isExpanded = expandedSections[item.title];
      
      return (
        <div key={item.title} className="mb-1">
          <button 
            onClick={() => toggleSection(item.title)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-200 hover:bg-indigo-800 transition-colors"
          >
            <div className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <ChevronRight 
              size={16} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {isExpanded && (
            <div className="ml-3 mt-1 space-y-1 border-l border-indigo-700 pl-3">
              {item.items.map(subItem => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  onClick={onItemClick}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-700 text-white' 
                        : 'text-gray-300 hover:bg-indigo-800 hover:text-white'
                    }`
                  }
                >
                  <span className="mr-3">{subItem.icon}</span>
                  <span className="text-sm">{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.exact}
        onClick={onItemClick}
        className={({ isActive }) => 
          `flex items-center px-3 py-2 rounded-md transition-colors ${
            isActive 
              ? 'bg-indigo-700 text-white' 
              : 'text-gray-300 hover:bg-indigo-800 hover:text-white'
          }`
        }
      >
        <span className="mr-3">{item.icon}</span>
        <span>{item.title}</span>
      </NavLink>
    );
  };

  const getInitials = (admin) => {
    if (!admin) return 'A';
    
    const firstName = admin.firstname || '';
    const lastName = admin.lastname || '';
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (admin.name) {
      const nameParts = admin.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return admin.name.charAt(0).toUpperCase();
    }
    
    return 'A';
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-indigo-900 to-indigo-950">
      {/* Logo & Header */}
      <div className="border-b border-indigo-800 p-4">
        <div className="flex items-center justify-center space-x-2 py-2">
          <div className="rounded-full bg-white p-2">
            <Settings size={20} className="text-indigo-900" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Portal</h2>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map(item => renderNavItem(item))}
      </nav>
      
      {/* User Profile & Logout */}
      <div className="border-t border-indigo-800 p-4">
        <div className="mb-3 flex items-center space-x-3 rounded-md bg-indigo-800 bg-opacity-30 p-2">
          {loading ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 w-24 animate-pulse rounded bg-indigo-700 bg-opacity-40 mb-1"></div>
                <div className="h-3 w-32 animate-pulse rounded bg-indigo-700 bg-opacity-30"></div>
              </div>
            </>
          ) : adminData ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700">
                <span className="text-sm font-medium text-white">{getInitials(adminData)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white truncate max-w-[140px]">
                  {adminData.firstname && adminData.lastname 
                    ? `${adminData.firstname} ${adminData.lastname}`
                    : adminData.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-300 truncate max-w-[140px]">{adminData.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700">
                <Users size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Administrator</p>
                <p className="text-xs text-gray-300">admin@example.com</p>
              </div>
            </>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-300 hover:bg-indigo-800 hover:text-white transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;