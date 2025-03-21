import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { admin } = useAuth();
  return admin ? children : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;
