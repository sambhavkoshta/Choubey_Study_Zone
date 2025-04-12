import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const token = localStorage.getItem("userToken");
  const lastActivity = localStorage.getItem("lastActivity");
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












