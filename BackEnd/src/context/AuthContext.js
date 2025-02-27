import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            logout();
          } else {
            setAdmin(decoded);
          }
        } catch (error) {
          console.error("Invalid Token:", error);
          logout();
        }
      }
    };

    checkTokenValidity();
  }, [admin]); // Admin के बदलाव पर चेक होगा

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdmin(jwtDecode(token));
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
