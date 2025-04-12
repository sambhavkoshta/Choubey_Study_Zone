import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-blue-600/95 via-indigo-600/95 to-purple-600/95 shadow-lg backdrop-blur-sm py-2" 
          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 group"
          >
            <motion.img 
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg" 
              src="./80466c2c-0bdb-4e19-be3b-55dd6cc2f220.jpg" 
              alt="Logo" 
            />
            <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-200 group-hover:from-yellow-200 group-hover:to-white transition duration-300 truncate">
              Choubey Study Zone
            </span>
          </Link>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-white hover:text-yellow-300 p-2 rounded-md transition duration-300 focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-2 text-sm lg:text-base font-medium text-white/90 hover:text-white transition-colors duration-300 group"
                >
                  {link.name}
                  {location.pathname === link.path ? (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 rounded-full group-hover:w-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="relative ml-4" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white/20 transition duration-300 border border-white/30"
                >
                  <span className="text-sm lg:text-base truncate max-w-32">{user ? user.firstname : "Profile"}</span>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IoIosArrowDown />
                  </motion.div>
                </motion.button>                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm text-gray-800 shadow-xl rounded-lg z-50 overflow-hidden border border-gray-100"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="font-medium truncate">{user ? user.firstname : "User"}</p>
                      </div>
                      
                      <Link
                        to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                        className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 transition duration-300"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 100 8 4 4 0 000-8zm-6 8.6a.5.5 0 00-.5.5V18a1 1 0 001 1h11a1 1 0 001-1v-6.9a.5.5 0 00-.5-.5H4z" clipRule="evenodd" />
                        </svg>
                        {isAdmin ? "Admin Panel" : "Dashboard"}
                      </Link>                     
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v4h-2V4H5v12h10v-3h2v4a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" clipRule="evenodd" />
                          <path d="M13 10h6v2h-6v3l-5-4 5-4v3z" />
                        </svg>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative ml-4" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLoginDropdown(!loginDropdown)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-400 shadow-md transition duration-300 text-sm lg:text-base font-medium flex items-center"
                >
                  <span>Login</span>
                  <motion.div
                    animate={{ rotate: loginDropdown ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <IoIosArrowDown />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {loginDropdown && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg z-50 overflow-hidden border border-gray-100"
                    >
                      <Link 
                        to="/login" 
                        className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 transition duration-300" 
                        onClick={() => setLoginDropdown(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        User Login
                      </Link>
                      <Link 
                        to="/admin/login" 
                        className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 transition duration-300" 
                        onClick={() => setLoginDropdown(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                        Admin Login
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <div className="bg-gradient-to-b from-indigo-600 to-purple-700 rounded-lg shadow-xl mt-4 overflow-hidden border border-indigo-400/30">
                <div className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center px-6 py-4 text-white transition duration-300 ${
                          location.pathname === link.path 
                            ? "bg-white/10 border-l-4 border-yellow-300" 
                            : "hover:bg-white/5 border-l-4 border-transparent"
                        }`}
                      >
                        {link.name}
                        {location.pathname === link.path && (
                          <motion.div 
                            className="ml-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="border-t border-indigo-400/30 mt-2 pt-2 pb-4 px-4">
                    {isAuthenticated ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="px-2 py-3 mb-3 bg-white/10 rounded-lg">
                          <p className="text-yellow-200 text-sm">Logged in as:</p>
                          <p className="font-medium text-white">{user ? user.firstname : "User"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Link
                            to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                            onClick={() => setMenuOpen(false)}
                            className="bg-white/20 rounded-lg flex items-center justify-center py-3 text-white hover:bg-white/30 transition duration-300"
                          >
                            {isAdmin ? "Admin Panel" : "Dashboard"}
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setMenuOpen(false);
                            }}
                            className="bg-red-500/70 rounded-lg flex items-center justify-center py-3 text-white hover:bg-red-500/90 transition duration-300"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="grid grid-cols-2 gap-3"
                      >
                        <Link
                          to="/login"
                          onClick={() => setMenuOpen(false)}
                          className="bg-yellow-500 rounded-lg flex items-center justify-center py-3 text-white font-medium hover:bg-yellow-400 transition duration-300"
                        >
                          User Login
                        </Link>
                        <Link
                          to="/admin/login"
                          onClick={() => setMenuOpen(false)}
                          className="bg-purple-500 rounded-lg flex items-center justify-center py-3 text-white font-medium hover:bg-purple-400 transition duration-300"
                        >
                          Admin Login
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;