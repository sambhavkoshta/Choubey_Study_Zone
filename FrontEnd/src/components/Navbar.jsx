// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Feedback from "./Feedback"; // Import Feedback component

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // Check if user is authenticated on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       setIsAuthenticated(true);
//       fetchUser(token);
//     }
//   }, []);

//   // Fetch user data from API
//   const fetchUser = async (token) => {
//     try {
//       const res = await axios.get("/api/students/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user", error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 shadow-xl mb-1">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* Left Section: Logo and Website Name */}
//           <div className="flex items-center space-x-3">
//             <img
//               className="h-12 w-12 rounded-full border-2 border-white shadow-xl hover:scale-110 transition-transform duration-300"
//               src="./80466c2c-0bdb-4e19-be3b-55dd6cc2f220.jpg"
//               alt="Logo"
//             />
//             <span className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors duration-300 tracking-wide">
//               Choubey Study Zone
//             </span>
//           </div>

//           {/* Right Section: Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6 ml-auto">
//             <Link to="/" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">Home</Link>
//             <Link to="/about" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">About</Link>
//             <Link to="/courses" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">Courses</Link>
//             <Link to="/study-material" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">Study Material</Link>
//             <Link to="/gallery" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">Gallery</Link>
//             <Link to="/contact" className="text-white hover:text-yellow-300 px-4 py-2 text-lg">Contact</Link>

//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="bg-gray-700 px-4 py-2 rounded flex items-center text-white"
//                 >
//                   {user ? user.name : "Profile"} ▼
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded">
//                     <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
//                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-lg">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-300 p-2 rounded-md">
//               <svg
//                 className={`${isOpen ? "hidden" : "block"} h-6 w-6 transition-transform duration-300`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               <svg
//                 className={`${isOpen ? "block" : "hidden"} h-6 w-6 transition-transform duration-300`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
//           <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-md shadow-lg">
//             <Link to="/" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Home</Link>
//             <Link to="/about" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">About</Link>
//             <Link to="/courses" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Courses</Link>
//             <Link to="/study-material" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Study Material</Link>
//             <Link to="/gallery" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Gallery</Link>
//             <Link to="/contact" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Contact</Link>

//             {isAuthenticated ? (
//               <>
//                 <button onClick={handleLogout} className="block text-white hover:text-yellow-300 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 text-lg">
//                   Logout
//                 </button>
//                 <Feedback isAuthenticated={isAuthenticated} />
//               </>
//             ) : (
//               <Link to="/login" className="block text-white hover:text-yellow-300 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 text-lg">
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { IoIosArrowDown } from "react-icons/io";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // Check if user is authenticated on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       setIsAuthenticated(true);
//       fetchUser(token);
//     }
//   }, []);

//   // Fetch user data from API
//   const fetchUser = async (token) => {
//     try {
//       const res = await axios.get("/api/students/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (error) {
//       console.error("Error fetching user", error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate("/login");
//   };

//   // Highlight active link
//   const getLinkClass = (path) => {
//     return window.location.pathname === path
//       ? "text-yellow-400 hover:text-yellow-500 px-4 py-2 text-lg"
//       : "text-white hover:text-yellow-300 px-4 py-2 text-lg";
//   };

//   return (
//     <nav className="bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500 shadow-xl sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//         <div className="flex justify-between items-center h-16">
//           {/* Left Section: Logo and Website Name */}
//           <div className="flex items-center space-x-3">
//             <img
//               className="h-12 w-12 rounded-full border-2 border-white shadow-xl hover:scale-110 transition-transform duration-300"
//               src="./80466c2c-0bdb-4e19-be3b-55dd6cc2f220.jpg"
//               alt="Logo"
//             />
//             <span className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors duration-300 tracking-wide">
//               Choubey Study Zone
//             </span>
//           </div>

//           {/* Right Section: Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6 ml-auto">
//             <Link to="/" className={getLinkClass("/")}>Home</Link>
//             <Link to="/about" className={getLinkClass("/about")}>About</Link>
//             <Link to="/courses" className={getLinkClass("/courses")}>Courses</Link>
//             <Link to="/study-material" className={getLinkClass("/study-material")}>Study Material</Link>
//             <Link to="/gallery" className={getLinkClass("/gallery")}>Gallery</Link>
//             <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>

//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-600 transition-colors duration-300"
//                 >
//                   <img
//                     className="h-8 w-8 rounded-full"
//                     src={user?.avatar || "https://via.placeholder.com/150"}
//                     alt="User Avatar"
//                   />
//                   <span>{user ? user.name : "Profile"}</span>
//                   <IoIosArrowDown />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
//                     <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-lg transition-colors duration-300">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-yellow-300 p-2 rounded-md">
//               <svg
//                 className={`${isOpen ? "hidden" : "block"} h-6 w-6 transition-transform duration-300`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               <svg
//                 className={`${isOpen ? "block" : "hidden"} h-6 w-6 transition-transform duration-300`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
//           <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-md shadow-lg">
//             <Link to="/" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Home</Link>
//             <Link to="/about" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">About</Link>
//             <Link to="/courses" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Courses</Link>
//             <Link to="/study-material" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Study Material</Link>
//             <Link to="/gallery" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Gallery</Link>
//             <Link to="/contact" className="block text-white hover:text-yellow-300 px-4 py-2 text-lg">Contact</Link>

//             {isAuthenticated ? (
//               <>
//                 <button onClick={handleLogout} className="block text-white hover:text-yellow-300 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 text-lg">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="block text-white hover:text-yellow-300 px-4 py-2 bg-yellow-500 hover:bg-yellow-300 text-lg">
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      fetchUser(userToken, "user");
    } else if (adminToken) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      fetchUser(adminToken, "admin");
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
    }

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setLoginDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  };

  const fetchUser = async (token, type) => {
    try {
      const res = await fetch(
        type === "admin"
          ? "http://localhost:7000/api/admin/profile"
          : "http://localhost:7000/api/student/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(isAdmin ? "adminToken" : "userToken");
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setDropdownOpen(false);
    navigate(isAdmin ? "/admin/login" : "/login");
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
    { path: "/courses", name: "Courses" },
    { path: "/gallery", name: "Gallery" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Site Name */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <img 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg transition-transform duration-300 hover:scale-110" 
              src="./80466c2c-0bdb-4e19-be3b-55dd6cc2f220.jpg" 
              alt="Logo" 
            />
            <span className="text-xl md:text-2xl font-bold text-white hover:text-yellow-300 transition duration-300 truncate">
              Choubey Study Zone
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-white hover:text-yellow-300 p-2 rounded-md transition duration-300 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm lg:text-base text-white transition duration-300 ${
                  location.pathname === link.path 
                    ? "border-b-2 border-yellow-300 text-yellow-300" 
                    : "hover:text-yellow-300"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Desktop Authentication Section */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-full flex items-center space-x-1 hover:bg-gray-600 transition duration-300 ml-2"
                >
                  <span className="text-sm lg:text-base truncate max-w-32">{user ? user.firstname : "Profile"}</span>
                  <IoIosArrowDown />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
                    <Link
                      to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {isAdmin ? "Admin Panel" : "Dashboard"}
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLoginDropdown(!loginDropdown)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition duration-300 text-sm lg:text-base ml-2"
                >
                  Login
                </button>
                {loginDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-50">
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-300" 
                      onClick={() => setLoginDropdown(false)}
                    >
                      User Login
                    </Link>
                    <Link 
                      to="/admin/login" 
                      className="block px-4 py-2 text-sm hover:bg-gray-200 transition duration-300" 
                      onClick={() => setLoginDropdown(false)}
                    >
                      Admin Login
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-lg mt-2 overflow-hidden">
            <div className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-white transition duration-300 ${
                    location.pathname === link.path 
                      ? "bg-blue-700 text-yellow-300 border-l-4 border-yellow-300" 
                      : "hover:bg-blue-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Authentication Section */}
              {isAuthenticated ? (
                <div className="border-t border-blue-700 mt-2 pt-2">
                  <div className="px-4 py-2 text-yellow-200">
                    Logged in as: <span className="font-medium">{user ? user.name : "User"}</span>
                  </div>
                  <Link
                    to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:bg-blue-700 transition duration-300"
                  >
                    {isAdmin ? "Admin Panel" : "Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-blue-700 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-blue-700 mt-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:bg-blue-700 transition duration-300"
                  >
                    User Login
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-white hover:bg-blue-700 transition duration-300"
                  >
                    Admin Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;