import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const AuthContext = createContext();


const refreshAccessToken = async () => {
  try {
    const { data } = await API.get("/admin/refresh-token"); // ✅ Call Backend API
    localStorage.setItem("adminToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    logout();
  }
};

// ✅ API Call with Auto Refresh
const apiWithAuth = async (url, method = "GET", body = null) => {
  let token = localStorage.getItem("adminToken");
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });

  if (response.status === 401) {
    token = await refreshAccessToken(); // 🔄 Try Refreshing Token
    if (!token) return; // ❌ If Refresh Fails, Logout
    headers.Authorization = `Bearer ${token}`;
    response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
  }

  return response.json();
};


export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Logout Function (Session Expired Handle करने के लिए)
  const logout = () => {
    localStorage.removeItem("adminToken");
    API.post("/admin/logout"); // ✅ Backend Logout API Call
    setAdmin(null);
    window.location.href = "/admin/login"; // ✅ Redirect to Login Page
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await API.get("/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdmin(data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Session Expired! Please Login Again."); // ✅ Show Alert
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, logout }}>
      {!loading && children} {/* ✅ Prevent Infinite Loop */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
