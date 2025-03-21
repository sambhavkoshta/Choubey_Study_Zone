// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("userToken");
//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;


// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute = () => {
//   const userToken = localStorage.getItem("userToken");
//   const adminToken = localStorage.getItem("adminToken");
//   const location = useLocation();

//   if (!userToken && !adminToken) {
//     return <Navigate to={location.pathname.includes("admin") ? "/admin/login" : "/login"} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // Authentication Context Import करो

// const ProtectedRoute = () => {
//   const { user } = useAuth(); // User Authentication Data

//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoute = () => {
//   const isAuthenticated = localStorage.getItem("userToken"); // Check Authentication

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const userToken = localStorage.getItem("userToken");

//   if (!userToken) {
//     console.log("🔴 User Not Authenticated! Redirecting to login...");
//     return <Navigate to="/login" />;
//   }

//   console.log("✅ User Authenticated! Rendering Dashboard...");
//   return <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("userToken");
  const lastActivity = localStorage.getItem("lastActivity");

  // ⏳ Auto Logout Condition (15 मिनट से ज्यादा Inactive या Tab Minimize)
  useEffect(() => {
    const checkActivity = () => {
      const now = Date.now();
      if (lastActivity && now - lastActivity > 15 * 60 * 1000) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("lastActivity");
        window.location.href = "/login";
      }
    };

    const interval = setInterval(checkActivity, 5000);
    return () => clearInterval(interval);
  }, [lastActivity]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;












