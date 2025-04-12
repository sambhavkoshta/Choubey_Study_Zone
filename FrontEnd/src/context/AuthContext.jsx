import { createContext, useContext, useEffect, useState } from "react";
import API from "../api";

const AuthContext = createContext();
const refreshAccessToken = async () => {
  try {
    const { data } = await API.get("/admin/refresh-token");
    localStorage.setItem("adminToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    logout();
  }
};
const apiWithAuth = async (url, method = "GET", body = null) => {
  let token = localStorage.getItem("adminToken");
  
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });

  if (response.status === 401) {
    token = await refreshAccessToken(); 
    if (!token) return; 
    headers.Authorization = `Bearer ${token}`;
    response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
  }

  return response.json();
};


export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const logout = () => {
    localStorage.removeItem("adminToken");
    API.post("/admin/logout"); 
    setAdmin(null);
    window.location.href = "/admin/login"; 
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
          alert("Session Expired! Please Login Again."); 
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
