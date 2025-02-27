import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("userToken");
  console.log("Stored Token:", token);

  if (token) {
    axios
      .get("/api/student/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("User Data:", res.data);
        setUser(res.data?.user || null); // Ensure user is not undefined
      })
      .catch((err) => {
        console.error("Profile Fetch Error:", err.response?.data || err);
        logout();
      })
      .finally(() => setLoading(false));
  } else {
    console.log("No Token Found, Setting Loading to False");
    setLoading(false);
  }
}, []);

  

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("userToken", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = async () => {
  try {
    await axios.post("/api/student/logout"); // ✅ Call backend logout API if exists
  } catch (error) {
    console.error("Logout failed", error);
  }
  localStorage.removeItem("userToken");
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
