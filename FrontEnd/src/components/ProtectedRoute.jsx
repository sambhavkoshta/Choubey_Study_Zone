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
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    console.log("🔴 User Not Authenticated! Redirecting to login...");
    return <Navigate to="/login" />;
  }

  console.log("✅ User Authenticated! Rendering Dashboard...");
  return <Outlet />;
};

export default ProtectedRoute;






