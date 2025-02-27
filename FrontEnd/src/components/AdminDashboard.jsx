import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!role || role !== "admin") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
