import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, User, BookOpen, Bookmark, MessageSquare, LogOut, ChevronRight, Award, Settings, Loader } from "lucide-react";
import API from "../../api";
const StudentSidebar = ({ onItemClick }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/dashboard", 
      icon: <Home size={18} />,
      exact: true 
    },
    { 
      title: "My Profile", 
      path: "/dashboard/profile", 
      icon: <User size={18} /> 
    },
    { 
      title: "Learning", 
      isSection: true,
      icon: <BookOpen size={18} />,
      items: [
        { 
          title: "My Courses", 
          path: "/dashboard/courses", 
          icon: <BookOpen size={16} /> 
        },
        { 
          title: "Study Materials", 
          path: "/dashboard/materials", 
          icon: <Bookmark size={16} /> 
        }
      ]
    },
    { 
      title: "Feedback", 
      path: "/dashboard/feedback", 
      icon: <MessageSquare size={18} /> 
    }
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('userToken');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await API.get('/student/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });        
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);
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
      const token = localStorage.getItem('userToken');
      await API.post('/student/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('userToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('userToken');
      navigate('/login');
    }
  };
  const renderNavItem = (item) => {
    if (item.isSection) {
      const isExpanded = expandedSections[item.title];      
      return (
        <div key={item.title} className="mb-1">
          <button 
            onClick={() => toggleSection(item.title)}
            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-200 hover:bg-blue-800 transition-colors"
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
            <div className="ml-3 mt-1 space-y-1 border-l border-blue-700 pl-3">
              {item.items.map(subItem => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  onClick={onItemClick}
                  className={({ isActive }) => 
                    `flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'text-gray-300 hover:bg-blue-800 hover:text-white'
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
              ? 'bg-blue-700 text-white' 
              : 'text-gray-300 hover:bg-blue-800 hover:text-white'
          }`
        }
      >
        <span className="mr-3">{item.icon}</span>
        <span>{item.title}</span>
      </NavLink>
    );
  };
  const getInitials = (user) => {
    if (!user) return '';
    const firstName = user.firstname || '';
    const lastName = user.lastname || '';
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (user.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="border-b border-blue-800 p-4">
        <div className="flex items-center justify-center space-x-2 py-2">
          <div className="rounded-full bg-white p-2">
            <BookOpen size={20} className="text-blue-900" />
          </div>
          <h2 className="text-xl font-bold text-white">Student Portal</h2>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map(item => renderNavItem(item))}
      </nav>
      <div className="border-t border-blue-800 p-4">
        <div className="mb-3 flex items-center space-x-3 rounded-md bg-blue-800 bg-opacity-30 p-2">
          {loading ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                <Loader size={16} className="text-white animate-spin" />
              </div>
              <div className="flex-1">
                <div className="h-4 w-24 animate-pulse rounded bg-blue-700 bg-opacity-40 mb-1"></div>
                <div className="h-3 w-32 animate-pulse rounded bg-blue-700 bg-opacity-30"></div>
              </div>
            </>
          ) : userData ? (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                <span className="text-sm font-medium text-white">{getInitials(userData)}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white truncate max-w-[140px]">
                  {userData.firstname && userData.lastname 
                    ? `${userData.firstname} ${userData.lastname}`
                    : userData.name || 'Student'}
                </p>
                <p className="text-xs text-gray-300 truncate max-w-[140px]">{userData.email}</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Student</p>
                <p className="text-xs text-gray-300">student@example.com</p>
              </div>
            </>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-300 hover:bg-blue-800 hover:text-white transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
export default StudentSidebar;