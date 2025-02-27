import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 ">
        <Outlet /> {/* Ye current page ka content render karega */}
      </div>
    </div>
  );
};

export default AdminLayout;
