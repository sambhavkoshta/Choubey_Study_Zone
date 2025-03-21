import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, User, BookOpen, Bookmark, MessageSquare, LogOut, ChevronRight } from "lucide-react";

const StudentSidebar = ({ onItemClick }) => {
  const [activeSection, setActiveSection] = useState(null);

  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/dashboard", 
      icon: <Home size={20} />,
      exact: true 
    },
    { 
      title: "My Profile", 
      path: "/dashboard/profile", 
      icon: <User size={20} /> 
    },
    { 
      title: "Learning", 
      isSection: true,
      items: [
        { 
          title: "My Courses", 
          path: "/dashboard/courses", 
          icon: <BookOpen size={20} /> 
        },
        { 
          title: "Study Materials", 
          path: "/dashboard/materials", 
          icon: <Bookmark size={20} /> 
        }
      ]
    },
    { 
      title: "Feedback", 
      path: "/dashboard/feedback", 
      icon: <MessageSquare size={20} /> 
    }
  ];

  const toggleSection = (title) => {
    setActiveSection(activeSection === title ? null : title);
  };

  const handleNavLinkClick = () => {
    if (onItemClick) onItemClick();
  };

  const NavItem = ({ item }) => {
    if (item.isSection) {
      return (
        <div className="mb-2">
          <button 
            onClick={() => toggleSection(item.title)}
            className="w-full flex items-center justify-between text-gray-300 py-2 px-3 rounded-md hover:bg-blue-800 transition-colors"
          >
            <span className="font-medium">{item.title}</span>
            <ChevronRight 
              size={16} 
              className={`transition-transform duration-200 ${activeSection === item.title ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {activeSection === item.title && (
            <div className="pl-4 mt-1 space-y-1 border-l border-blue-700 ml-3">
              {item.items.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  onClick={handleNavLinkClick}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 py-2 px-3 rounded-md transition-all
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`
                  }
                >
                  {subItem.icon}
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
        onClick={handleNavLinkClick}
        className={({ isActive }) => 
          `flex items-center space-x-3 py-2 px-3 rounded-md transition-all
          ${isActive 
            ? 'bg-blue-700 text-white shadow-md' 
            : 'text-gray-300 hover:bg-blue-800 hover:text-white'}`
        }
      >
        {item.icon}
        <span>{item.title}</span>
      </NavLink>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-900 to-blue-950">
      {/* Logo & Header */}
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center justify-center space-x-2 py-3">
          <div className="bg-white p-2 rounded-full">
            <BookOpen size={20} className="text-blue-900" />
          </div>
          <h2 className="text-xl font-bold text-white">Student Portal</h2>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavItem key={item.path || `section-${index}`} item={item} />
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-blue-800">
        <NavLink
          to="/login"
          onClick={handleNavLinkClick}
          className="flex items-center space-x-3 py-2 px-3 rounded-md text-gray-300 hover:bg-blue-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default StudentSidebar;