import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
